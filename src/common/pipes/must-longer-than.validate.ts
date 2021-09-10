import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function MustLongerThan(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      propertyName: propertyName,
      target: object.constructor,
      async: true,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return new Promise((ok) => {
            if (value !== 'admin' && value !== 'user') {
              ok(true);
            } else {
              ok(false);
            }
          });
        },
      },
    });
  };
}
