import { List, renderCondition, isEqual } from '../cdk/utils';
import { computed, defineComponent, Ref, ref, renderSlot, SetupContext, watch } from "vue";
import { Tooltip, vTooltip } from '../tooltip';
// import { TagInput } from './tag-input';
import { Input } from '../input';
import { SelectSerivce } from './select.service';
import { OptionGroup } from './option';

function useClear(
  ctx: SetupContext,
  inputValue: Ref<any>,
  visible: Ref<boolean>,
  remote: Ref<boolean>,
  filterable: Ref<boolean>,
  multiple: Ref<boolean>
) {
  const iconClass = computed(() => {
    return remote.value && filterable.value ? '' : (visible.value ? 'arrow-up is-reverse' : 'arrow-up');
  });

  const onClear = (event: Event) => {
    event.stopPropagation();
    const value = multiple.value ? [] : '';
    if (!isEqual(inputValue.value, value)) {
      ctx.emit('change', value);
    }
    ctx.emit('input', value);
    ctx.emit('clear');
    visible.value = false;
  }

  return {
    iconClass,
    onClear
  }
}


export const Select = defineComponent({
  directives: {
    tooltip: vTooltip,
  },
  props: {
    id: String,
    name: String,
    modelValue: {
      type: [String, Number, List<string | number>()],
      default: ''
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'el.select.placeholder',
    },
    readonly: {
      type: Boolean,
      default: false
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    showClose: Boolean,
  },

  setup(props) {
    const selectService = new SelectSerivce();

    const emptyText = computed(() => '');
    const selectedLabel = ref('');
    
    watch(selectService.options, (value) => {
      console.log(value);
    });

    return {
      emptyText,
      collapseTagSize: '',
      selectSize: '',
      inputWidth: 100,
      selected: [],
      selectedLabel,
      iconClass: '',
      handleClearClick: () => { },
      options: selectService.options,
    }
  },

  render() {
    const {
      id,
      multiple,
      filterable,
      placeholder,
      readonly,
      loading,
      allowCreate,
      autocomplete,
      selectSize,
      selectedLabel,
      disabled,
      showClose,
      iconClass,
      handleClearClick,
      options
    } = this;

    return [
      <div
        class={["el-select", selectSize ? 'el-select--' + selectSize : '']}
        v-tooltip="tooltip"
      >
        <Input
          // ref="reference"
          v-model={selectedLabel}
          type="text"
          placeholder={placeholder}
          name={name}
          id={id}
          autocomplete={autocomplete}
          size={selectSize}
          disabled={disabled}
          readonly={readonly}
          validate-event="false"
          class="{ 'is-focus': visible }"
          tabindex={(multiple && filterable) ? -1 : undefined}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
          v-slots={{
            prefix: () => this.$slots.prefix,
            suffix: () => [
              <i v-show={!showClose} class={['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]} />,
              renderCondition(showClose, <i class="el-select__caret el-input__icon el-icon-circle-close" onClick={handleClearClick} />)
            ],
          }}
        />
      </div>,
      <Tooltip
        ref="tooltip"
        trigger="click"
        placement="bottom"
        effect="light"
        transition="el-zoom-in-top"
        visibleArrow={false}
      >
        <div class="el-select-dropdown__wrap">
          <ul
            v-show={options.length > 0 && !loading}
            class={['el-select-dropdown__list', { 'is-empty': !allowCreate }]}
          >
            {this.$slots.default?.()}
          </ul>
        </div>
      </Tooltip>,
      // <Tooltip
      //   ref="selectTooltip"
      //   transition="el-zoom-in-top"
      //   effect="light"
      //   trigger="click"
      //   popperClass={['el-select-dropdown', multiple ? 'is-multiple' : '']}
      // >
      //   <div class="el-select-dropdown__wrap">
      //     <ul
      //       v-show={options.length > 0 && !loading}
      //       class={['el-select-dropdown__list', { 'is-empty': !allowCreate }]}
      //     >
      //       {renderSlot(this.$slots, 'default')}
      //     </ul>
      //   </div>
      //   {renderCondition(
      //     emptyText && (!allowCreate || loading || (allowCreate && options.length === 0)),
      //     renderCondition(
      //       this.$slots.empty,
      //       renderSlot(this.$slots, 'empty'),
      //       <p class="el-select-dropdown__empty">
      //         {emptyText}
      //       </p>
      //     )
      //   )}
      // </Tooltip>
    ];
  }
});
