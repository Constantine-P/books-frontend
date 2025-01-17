import { transliterate } from '@/helpers/transliterate';

export function slugify(cyrillicStr: string) {
  return transliterate(cyrillicStr).toLowerCase().replaceAll(' ', '-');
}
