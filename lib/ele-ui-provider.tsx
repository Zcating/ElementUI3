import { defineComponent, renderSlot } from "vue";
import { globalInject } from './cdk/global';
import { getClassToken } from "./cdk/tools";
import { MessageService, MessageServiceImpl } from "./message/message.service";
import { NotificationService, NotificationServiceImpl } from './notification/notification.service';

export const $message = getClassToken<MessageService>(MessageServiceImpl);
export const $notify = getClassToken<NotificationService>(NotificationServiceImpl);

export const EleUIProvider = defineComponent({
  setup(_, ctx) {
    globalInject()
    const messageService = new MessageServiceImpl($message);
    const notificationService = new NotificationServiceImpl($notify);
    return () => (
      <>
        {renderSlot(ctx.slots, 'default')}
        <messageService.container />
        <notificationService.container />
      </>
    )
  }
});
