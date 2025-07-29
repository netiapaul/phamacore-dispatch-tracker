export interface User {
  userId: number;
  userName: string;
  firstName: string;
  secondName: string;
  idNo: string;
  phoneNo: null;
  email: null;
  address: null;
  userRoleId: number;
  userRole: string;
  userStatus: boolean;
  companyDetailId: number;
  companyName: string;
  clientCode: string;
}

export interface AuthState {
  user: User;
  token: string;
  refreshToken: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
}
