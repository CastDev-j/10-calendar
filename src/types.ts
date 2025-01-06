export type EventType = {
  title: string;
  notes: string;
  start: string;
  end: string;
  bgColor?: string;
  user: {
    _id: string;
    name: string;
  };
};

export interface StartLoginProps {
  email: string;
  password: string;
}

export interface StartRegisterProps {
  name: string;
  email: string;
  password: string;
}
