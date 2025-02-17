const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;

describe("Username Validation Regex", () => {
  test("should validate a username with at least 1 capital letter, 1 special character, 1 number, and is 8 characters long", () => {
    const validUsernames = [
      "Password1!",
      "Test@1234",
      "Valid#5678",
      "Example$9A",
      "Strong&Pass1",
    ];

    validUsernames.forEach((username) => {
      expect(regex.test(username)).toBe(true);
    });
  });

  test("should invalidate a username without a capital letter", () => {
    const invalidUsernames = [
      "password1!",
      "test@1234",
      "valid#5678",
      "example$9a",
      "strong&pass1",
    ];

    invalidUsernames.forEach((username) => {
      expect(regex.test(username)).toBe(false);
    });
  });

  test("should invalidate a username without a special character", () => {
    const invalidUsernames = [
      "Password1",
      "Test1234",
      "Valid5678",
      "Example9A",
      "StrongPass1",
    ];

    invalidUsernames.forEach((username) => {
      expect(regex.test(username)).toBe(false);
    });
  });

  test("should invalidate a username without a number", () => {
    const invalidUsernames = [
      "Password!",
      "Test@abcd",
      "Valid#efgh",
      "Example$ij",
      "Strong&Pass",
    ];

    invalidUsernames.forEach((username) => {
      expect(regex.test(username)).toBe(false);
    });
  });

  test("should invalidate a username less than 8 characters long", () => {
    const invalidUsernames = ["Pass1!", "T@1234", "V#5678", "Ex$9A", "S&Pa1"];

    invalidUsernames.forEach((username) => {
      expect(regex.test(username)).toBe(false);
    });
  });
});
