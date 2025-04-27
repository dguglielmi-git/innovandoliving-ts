export interface ImageDropdownEntity {
  avatar: boolean;
  src?: string;
}

export interface DropdownOptionsEntity {
  key: string;
  text: string;
  value: string;
  image?: ImageDropdownEntity;
}

export interface CustomDropdownProps {
  placeholder?: string;
  options: DropdownOptionsEntity[];
  name?: string;
  onChange?: (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
  error?: boolean;
  value?: string;
}
