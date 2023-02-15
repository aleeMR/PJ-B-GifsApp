export function MAIL_RESET_USER(username: string, password: string) {
  return `<p>Estimado usuario se ha reseteado la contraseña de su usuario ${username}</p>
        <p>\nSu contraseña es la siguiente:<br> 
        <p><b> ${password} </b></p>`;
}
