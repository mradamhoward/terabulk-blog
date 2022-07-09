export function convertKebabCaseToSpaceDelimited(value: string){
  while(value.includes("-")){
    value = value.replace("-", " ")
  }
  value.trimEnd()
  return value;
}
