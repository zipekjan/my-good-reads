type ClassNamesItem = string | undefined | null | boolean | string[] | Record<string, boolean | null | undefined>

const cn = (...args: ClassNamesItem[]) => args.map(a => {
  if (Array.isArray(a)) {
    return a.filter(a => !!a).join(' ');
  }

  if (a && typeof a === 'object') {
    return Object.keys(a).filter(key => !!a[key]).join(' ');
  }

  return a;
}).filter(a => !!a).join(' ');

export default cn;
