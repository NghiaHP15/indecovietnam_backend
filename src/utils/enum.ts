export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum SettingType {
  TEXT = 'text',
  IMAGE = 'image',
  URL = 'url',
  HTML = 'html',
  JSON = 'json',
}

export enum Level {
    SILVER = 'silver',
    GOLD = 'gold',
    VIP = 'vip',
}

export enum Provider {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    LOCAL = 'local',
}

export enum Status_active {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum Position {
    CEO = 'ceo',
    MANAGER = 'manager',
    CSKH = 'cskh',
    STAFF = 'staff',
    OTHER = 'other',
}

export enum StatusProduct {
    SALE = 'sale',
    NEW = 'new',
    HOT = 'hot',
    DEFAULT = 'default',
}

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    AWAITTING_CONFIRMATION = 'awaiting_confirmation',
    CANCELLED = 'cancelled',
    FAILED = 'failed',
}

export enum ProductRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum ProductBatchesStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export enum WarehouseImportStatus {
    PENDING = 'pending',
    CHECKED = 'checked',
    DEFECTIVE = 'defective',
}

export enum CheckStatus {
    PASS = 'pass',
    FAIL = 'fail',
}

export enum DamagereportStatus {
    OPEN = 'open',
    RESOLVED = 'resolved',
}

export enum ShipperType {
    INTERNAL = 'internal',
    EXTERNAL = 'external',
}

export enum ShippingStatus {
    PREPARING = 'preparing',
    SHIPPING = 'shipping',
    DELIVERED = 'delivered',
    FAILED = 'failed',
    RETURNED = 'returned',
}

export enum DefaultPassword {
    DEFAULT_PASSWORD = '123456'
}

export enum PositionMenu {
    HEADER = 'header',
    FOOTER = 'footer'
}

export enum TypeGallery {
    SLIDER = 'slider',
    BANNER = 'banner',
    DESIGN = 'design',
    SOCIAL = 'social',
}

export enum PaymentMethod {
    MOMO = 'momo',
    VNPAY = 'vnpay',
    BANK = 'bank'
}

export enum TypeFeedback {
    CONTACT = 'contact',
    DESIGN = 'design',
    FEEDBACK = 'feedback',
    OTHER = 'other'
}

export enum TypeNotification {
    ORDER = 'order',
    CONTACT = 'contact',
    SALE = 'sale',
    NEWS = 'news',
}
