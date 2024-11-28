async function decodeToken(token) {
  try {
    const { default: jwtDecode } = await import('jwt-decode');
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
  }
}

export default decodeToken;