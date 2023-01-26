export default interface IAuthUser {
  id: string,
  accessToken: string,
  tokenType: string,
  username: string,
  email: string,
  roles: string[]
}
