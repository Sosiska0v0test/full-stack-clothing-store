import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Коментар обов'язковий")
    .max(200, "Коментар має бути менше 200 символів"),
  rating: yup.number().required("Виберіть оцінку"),
});

const productValidation = yup.object().shape({
  name: yup
    .string()
    .required("Введіть назву товару")
    .max(100, "Назва товару має містити менше 100 символів"),
  prise: yup.number().required("Введіть ціну товару"),
  size: yup.string().required("Введіть розмір товару"),
  gender: yup.string().required("Введіть для кого цей товар"),
  material: yup.string().required("Введіть матеріал товару"),
  category: yup.string().required("Виберіть категорію товару"),
  desc: yup
    .string()
    .required("Введіть опис товару")
    .max(4000, "Опис товару не повинен перевищувати 4000 символів"),
});

export { ReviewValidation, productValidation };
