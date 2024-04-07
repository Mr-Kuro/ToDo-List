
export const formTemplateProps = (name: string) => {
  const title = name
  const subtitle = `Please, fill the form to ${name}`;
  const buttonLabel = name;
  return { title, subtitle, buttonLabel };
}