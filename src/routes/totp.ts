import * as otpauth from "otpauth";
export function get_totp(secret_url: string, timestamp?: number): string {
    let totp = otpauth.URI.parse(secret_url)
    if (!timestamp) {
        timestamp = Date.now()
    }
    return totp.generate({ timestamp: timestamp })
}
export function is_valid_uri(secret_url: string): boolean {
    try {
        otpauth.URI.parse(secret_url)
        return true
    }
    catch (error) {
        return false
    }


}
interface details {
    parsed:otpauth.TOTP,
    totp: string,
    remaining_time: number
}
export function get_details_uri(secret_url: string, timestamp?: number): details {
    let totp = otpauth.URI.parse(secret_url) as otpauth.TOTP
    if (!timestamp) {
        timestamp = Date.now()
    }
    let remaining_time = totp.period - (timestamp/1000 % totp.period)
    return {
        parsed: totp,
        totp: get_totp(secret_url),
        remaining_time: remaining_time
    }

}


