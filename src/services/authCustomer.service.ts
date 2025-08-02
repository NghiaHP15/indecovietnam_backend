import { Customer } from './../entity/Customer';
import { RegisterCustomerDto, LoginCustomerDto, ResponseCustomerDto, SocialLoginCustomerDto } from "../dto/customer.dto";
import { customerRepo } from "../repositories/customer.repository";
import { Provider } from "../utils/enum";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import bcrypt from "bcryptjs";
import { refreshTokenRepo } from "../repositories/refreshToken.repository";
import { createError } from '../utils/response';

export const register = async (dto: RegisterCustomerDto) => {
    const exists = await customerRepo.findOneBy({ email: dto.email });
    if(exists) throw createError("Email already exists", 401);
    const password_hash = await bcrypt.hash(dto.password, 10);
    const customer = customerRepo.create({
        ...dto, 
        password_hash,
        provider: Provider.LOCAL,
    });
    await customerRepo.save(customer);
    const tokens = generateTokens(customer);
    const refreshToken = refreshTokenRepo.create({
        ip: dto.ip,
        userAgent: dto.userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        token: tokens.refreshToken,
        customer
    })
    await refreshTokenRepo.save(refreshToken);
    const user = generateUser(customer);
    return { ...tokens, user};
}

export const login = async (dto: LoginCustomerDto) => {
    const customer = await customerRepo.findOneBy({ email: dto.email });
    if(!customer) throw createError("Invalid email", 401);
    const isValid = await bcrypt.compare(dto.password, customer.password_hash || "");
    if(!isValid) throw createError("Invalid passoword", 401);
    const tokens = generateTokens(customer);
    const refreshToken = refreshTokenRepo.create({
        ip: dto.ip,
        userAgent: dto.userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        token: tokens.refreshToken,
        customer
    })
    await refreshTokenRepo.save(refreshToken);
    const user= generateUser(customer);
    return { ...tokens, user};
}

export const socialLogin = async (dto: SocialLoginCustomerDto) => {
    let customer = await customerRepo.findOneBy({ email: dto.email });
    if(!customer) {
        customer = customerRepo.create({
            ...dto,
            provider: dto.provider,
            provider_id: dto.provider_id
        });
        await customerRepo.save(customer);
    }
    const tokens = generateTokens(customer);
    const refreshToken = refreshTokenRepo.create({
        ip: dto.ip,
        userAgent: dto.userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        token: tokens.refreshToken,
        customer
    })
    await refreshTokenRepo.save(refreshToken);
    const user = generateUser(customer);
    return { ...tokens, user};
}

export const logout = async (refreshToken: string) => {
    const existing = await refreshTokenRepo.findOne({ where: { token: refreshToken }, relations: ["customer"] });
    if(!existing) throw createError('Invalid refresh token', 401);
    await refreshTokenRepo.delete({ id: existing.id });
}

export const refreshAccessToken = async (token: string) => {
    const existing = await refreshTokenRepo.findOne({ where: { token }, relations: ["customer"] });
    if(!existing) throw createError('Invalid refresh token', 401);
    const isExpired = existing.expiresAt.getTime() < Date.now();
    if (isExpired) {
        await refreshTokenRepo.delete({ id: existing.id });
        throw createError('Refresh token expired', 401);
    }
    const tokens = generateTokens(existing.customer);
    existing.token = tokens.refreshToken;
    existing.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await refreshTokenRepo.save(existing);
    const user = generateUser(existing.customer);
    return { ...tokens, user};
}

export const generateTokens = (customer: Customer) => {
    const payload = {id: customer.id, email: customer.email};
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { accessToken, refreshToken };
}

export const generateUser = (cutomer: Customer) => {
    const user: ResponseCustomerDto = { 
        id: cutomer.id,
        email: cutomer.email,
        phone: cutomer.phone, 
        firstname: cutomer.firstname, 
        lastname: cutomer.lastname, 
        avatar: cutomer.avatar, 
        provider: cutomer.provider 
    };
    return user;
}