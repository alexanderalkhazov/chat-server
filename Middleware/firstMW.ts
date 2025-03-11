
export const firstMW = async (ctx: any, next: any) => {
  console.log('firstMW Printed This!');
  return await next();
};
