/** trigger user logout action
 * clears the stored tokens and navigates user to the login page
 */
export const logoutHandler = (
  setLoggedIn: (value: boolean) => void,
  navigate: (path: string) => void
) => {
  localStorage.removeItem("shipmentAuth");
  setLoggedIn(false);
  navigate("/login");
};
