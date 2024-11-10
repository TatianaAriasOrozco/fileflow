export const login = async (email: string, password: string) => {
  if (email === "admin@mail.com" && password === "supersecret") {
    return {
      ok: true,
      data: {
        email: "admin@mail.com",
        role: "admin",
        token: "your-generated-jwt-token",
      },
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const uploadCSV = async (file: File) => {
  return {
    ok: true,
    data: {
      success: [
        { id: 1, name: "John Doe", email: "john.doe@example.com", age: 28 },
      ],
      errors: [
        {
          row: 4,
          details: {
            name: "The 'name' field cannot be empty.",
            email: "Invalid email format.",
            age: "The 'age' field must be a positive number.",
          },
        },
      ],
    },
  };
};
