export default function firstName(input: string): string {
  const lastIndex = input.lastIndexOf(' ');
  return input.substring(0, lastIndex);
}
