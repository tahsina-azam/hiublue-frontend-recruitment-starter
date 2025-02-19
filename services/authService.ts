export interface LoginResponse {
  user: { id: number; name: string; email: string };
  token: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch('https://dummy-1.hiublue.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Invalid credentials');

  return await response.json();
};
