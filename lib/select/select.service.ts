import { InjectionKey, provide, ref, Ref, shallowRef, watch, WatchSource } from 'vue';


export class SelectSerivce {
  static key: InjectionKey<SelectSerivce> = Symbol();

  private readonly optionsRef: Ref<{ value: string | number, readonly current: Symbol }[]> = ref([]);

  get options() {
    const values = shallowRef<(string | number)[]>([]);
    watch(this.optionsRef, (options) => {
      values.value = options.map(opt => opt.value);
    }, { immediate: true, deep: true });
    return values;
  }

  constructor() {
    provide(SelectSerivce.key, this);
  }

  watchOptions(source: WatchSource<number | string>, current: Symbol) {
    watch(source, (value) => {
      const options = this.optionsRef.value;
      const index = options.findIndex((option) => option.current === current);
      if (index === -1) {
        options.push({ current, value });
      } else {
        options[index].value = value;
      }
    }, { immediate: true });
  }
}