// import Bull from "bull";
// import { URL } from "url";

// const redisUrl = new URL(process.env.REDIS_URL || "");

// const redisOption = {
//     host: redisUrl.hostname,
//     port: Number(redisUrl.port),
//     password: redisUrl.password.replace(/^:/, ""), // ✅ loại bỏ dấu :
//     tls: redisUrl.protocol === "rediss:" ? {} : undefined,
// };

// export const emailQueue = new Bull("emailQueue", {
//     redis: redisOption,
// });