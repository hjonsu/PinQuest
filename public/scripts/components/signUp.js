const signUpElement = () => {
  return `
  <form method="POST" action="/api/users/signup" class="signup-form">
  <p id="signup-title">Sign Up</p>

  <div class="signup-form">
  <input type="text" name="First Name" placeholder="First Name">
</div>

<div class="signup-form">
  <input type="text" name="Last Name" placeholder="Last Name">
</div>

  <div class="signup-form">
    <input type="email" name="email" placeholder="Email">
  </div>

  <div class="signup-form">
      <input type="password" name="password" placeholder="Password">
    </div>

  <div class="signup-form" id="signup-box">
      <button id="signupbtn">Sign Up</button>
  </div>

  <div class="signup-form" id="log-in-redirect">
      <a href="api/users/register">Log In</a>
  </div>
</form>
`
}
