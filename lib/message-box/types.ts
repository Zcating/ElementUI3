import { VNode, InjectionKey } from 'vue';

export interface MessageBoxData {
  title?: string;
  icon?: string;
  message?: string | VNode;
  dangerouslyUseHTMLString?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  contentType?: 'prompt' | 'confirm' | 'alert';
  iconClass?: string;
  customClass?: string;
  showClose?: boolean;
  beforeClose?: () => void;
  distinguishCancelAndClose?: boolean;
  lockScroll?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  cancelButtonClass?: string;
  confirmButtonClass?: string;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  closeOnHashChange?: boolean;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputType?: 'text' | 'textarea';
  inputValue?: string;
  inputPattern?: string;
  inputErrorMessage?: string;
  center?: boolean;
  roundButton?: boolean;
}

export const MessageBoxData = Symbol() as InjectionKey<MessageBoxData>;

