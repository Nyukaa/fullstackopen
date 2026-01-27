const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  notification,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      {notification?.message && (
        <div style={{ color: notification.type === "error" ? "red" : "green" }}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
