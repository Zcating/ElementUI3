import { Overlay } from '@/cdk';
import { defineComponent, inject, reactive, ref, renderSlot } from "vue";
import { Input } from '../input';
import { Button } from '../button';
import { renderCondition } from '@/cdk/utils';
import { MessageBoxData } from './types';


type MessageBoxAction = 'close' | 'confirm' | 'cancel' | 'none';

export const MessageBox = defineComponent({
  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    closeOnHashChange: {
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      default: false,
      type: Boolean
    }
  },
  setup(props, ctx) {
    const {
      title,
      icon,
      message,
      dangerouslyUseHTMLString,
      type,
      contentType,
      showInput,
      showCancelButton,
      showConfirmButton,
      cancelButtonText,
      confirmButtonText,
      cancelButtonClass,
      confirmButtonClass,
      roundButton,
      inputValue,
      inputType,
      beforeClose,
    } = inject(MessageBoxData, {});

    const { 
      center, 
      showClose, 
    } = props;
    const visible = ref(false);
    const action = ref<MessageBoxAction>('none');
    const state = reactive({
      visible,
    });


    const handleAction = (theAction: MessageBoxAction) => {
      if (contentType === 'prompt' && theAction === 'confirm') {
        return;
      }
      action.value = theAction;
      if (typeof beforeClose === 'function') {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    }

    const handleInputEnter = () => {

    }

    return () => (
      <Overlay v-model={state.visible}>
        <div class={["el-message-box"]}>
          {renderCondition(
            title !== null,
            <div class="el-message-box__header">
              <div class="el-message-box__title">
                {renderCondition(
                  icon && center,
                  <div class="['el-message-box__status', icon]" />
                )}
                <span>{title}</span>
              </div>
              {renderCondition(
                showClose,
                <button
                  type="button"
                  class="el-message-box__headerbtn"
                  aria-label="Close"
                  onClick={() => handleAction('close')}
                  onKeydown={() => handleAction('close')}>
                  <i class="el-message-box__close el-icon-close"></i>
                </button>
              )}
            </div>
          )}
          <div class="el-message-box__content">
            <div class="el-message-box__container">
              {renderCondition(
                icon && !center && message !== '',
                <div class="['el-message-box__status', icon]" />
              )}
              {renderCondition(
                message !== '',
                <div class="el-message-box__message">
                  {renderSlot(ctx.slots, 'default')}
                  {renderCondition(
                    dangerouslyUseHTMLString,
                    <p innerHTML={typeof message === 'string' ? message : ''}></p>,
                    <p>{message}</p>,
                  )}
                </div>
              )}
            </div>
            <div class="el-message-box__input" v-show={!!showInput}>
              <Input
                v-model={inputValue}
                type={inputType}
                onKeydown={/*enter.native*/handleInputEnter}
                placeholder={inputPlaceholder}
                ref="input"
              />
              <div class="el-message-box__errormsg" style={{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }}>{editorErrorMessage}</div>
            </div>
          </div>
          <div class="el-message-box__btns">
            {renderCondition(
              showCancelButton,
              <Button
                class={cancelButtonClass}
                round={roundButton}
                size="small"
                onClick={/*.native*/() => handleAction('cancel')}
                onKeydown={/*.enter*/() => handleAction('cancel')}
              >
                {cancelButtonText || '取消'}
              </Button>
            )}
            {renderCondition(
              showConfirmButton,
              <Button
                ref="confirm"
                class={confirmButtonClass}
                v-show={showConfirmButton}
                round={roundButton}
                size="small"
                onClick={(e: Event) => handleAction('confirm')}
                onKeydown={(e: KeyboardEvent) => handleAction('confirm')}
              >
                {confirmButtonText || '确认'}
              </Button>
            )}
          </div>
        </div>
      </Overlay>
    )
  }
});
