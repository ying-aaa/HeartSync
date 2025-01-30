export function isObject(
  value: any,
  mode: 'typeof' | 'instanceof' | 'toString' | 'comprehensive' = 'toString',
): boolean {
  const modeConfig = {
    typeof:
      typeof value === 'object' && value !== null && !Array.isArray(value),
    instanceof:
      value instanceof Object && value !== null && !Array.isArray(value),
    toString: Object.prototype.toString.call(value) === '[object Object]',
    comprehensive:
      typeof value === 'object' && value !== null && !Array.isArray(value),
  };

  return modeConfig[mode];
}

export function isSameObj(value1: any, value2: any): boolean {
  if (typeof value1 === typeof value2) {
    if (isObject(value1) && isObject(value2)) {
      for (const key1 in value1) {
        for (const key2 in value2) {
          if (key1 === key2) {
            return !isSameObj(value1[key1], value2[key2][1]);
          }
        }
      }
    }
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return value1.every((val1, index) => val1 === value2[index]);
    }
    return value1 === value2;
  }
  return false;
}

// 返回最终匹配项
export function getRecursivePosition(
  origin: any,
  value: any,
  existingOffset: Array<number> = []
): {
  offset: number[];
  value: any;
} | null {
  for (let i = 0; i < origin.length; i++) {
    let offset: number[] = [...existingOffset, i];
    if (origin[i].key == value) {
      return { offset, value: origin[i] };
    } else {
      if (origin[i].children && origin[i].children.length) {
        const res = getRecursivePosition(origin[i].children, value, offset);
        if (res) return res;
      }
    }
  }
  return null;
}

export function deepClone<T>(obj: T, hash = new WeakMap()): T {
  // 如果是原始类型，直接返回
  if (obj === null) return null as any;
  if (obj instanceof Date) return new Date(obj) as any;
  if (obj instanceof RegExp) return new RegExp(obj) as any;
  if (typeof obj !== 'object') return obj as any;

  // 如果是数组
  if (Array.isArray(obj)) {
    const clone: any[] = [];
    for (let item of obj) {
      clone.push(deepClone(item, hash));
    }
    return clone as T;
  }

  // 如果是对象
  if (obj instanceof Object) {
    // 检查是否已经克隆过，防止循环引用
    if (hash.has(obj)) return hash.get(obj) as T;

    const clone: { [key: string]: any } = {};
    hash.set(obj, clone);

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone((obj as any)[key], hash);
      }
    }
    return clone as T;
  }

  throw new Error('Unable to copy obj! Its type isn\'t supported.');
}