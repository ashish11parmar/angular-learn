let nodeApi = "http://localhost:4000/api/"

export const config = {
    register: `${nodeApi}v1/auth/signup`,
    login: `${nodeApi}v1/auth/signin`,
    otpverification: `${nodeApi}v1/auth/verify/otp`
}