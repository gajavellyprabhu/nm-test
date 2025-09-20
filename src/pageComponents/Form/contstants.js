import FormButtonContainer from './FormButtonContainer';
import { FieldTypes } from '@sitecore-jss/sitecore-jss-react-forms';
import CustomCheckbox from './CustomCheckbox';
import CustomRadioButtonList from './CustomRadioButtonList';
import CustomCheckboxList from './CustomCheckboxList';
import CustomDropdown from './CustomDropdown';
import CustomSingleLineText from './CustomSingleLineText';
import CustomFileUpload from './CustomFileUpload';
import FormWrapperSection from './FormWrapperSection';
import CustomSlider from './CustomSlider';
// import FormStepper from "components/FormStepper";
import CustomDatePicker from './CustomDatePicker';
import CustomMultipleLineText from './CustomMultipleLineText';
import CustomDownloadLink from './CustomDownloadLink';

const customFormFields = {
  singleLineText: '{DA546F86-0487-4FF7-9C6C-FEAA7FD51054}',
  multipleLineTextWithDataLayers: '{FFE47988-D3E3-4AD2-A7E2-65E669FDC0CD}',
  singleLineTextWithdDataLayers: '{95A2FAEB-06A9-4455-A734-EF907F20C102}',
  number: '{F3581ED2-DE6E-40F5-A80D-F0BCF485FF2E}',
  slider: '{A7A09F51-B5C3-4205-A7F2-8441924B1EB4}',
  checkbox: '{793A094D-789E-4537-A66C-ED5FF8BBD145}',
  checkboxList: '{5AE244AD-C021-46CB-B006-685317071B13}',
  dropdownList: '{9CB5BE24-9A8C-487C-AB7B-79E99165AC56}',
  radioButtonList: '{079C529E-2D9B-40FE-9AC5-5419CCFF856B}',
  stepper: '{C7DEA001-643A-44C3-A9C5-42F64416B16B}',
  PhoneNumber: '{7BA6AF1A-AB60-46C5-BCA3-A9FEAB417235}',
  recaptcha: '{1EE31041-E090-4136-9812-10DE2C21F1D0}',
  countryDropdown: '{F27A581B-351E-4825-88B1-6DAE585D045E}',
  downloadLink: '{CE946F0C-91CA-4168-B2A4-99265A429FCD}',
  uploadFieldWithDataLayers: '{102FEC77-889B-4556-95A0-E0BC0AA0E769}',
  emailWithDataLayers: '{B6DB61C7-ACAC-410C-A9C0-2D19322AE654}',
};
const inputPatterns = {
  // number: /^[0-9]*[1-9][0-9]*$/,
  // phone: /^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$/,
  number: '',
  phone: '',
};
export const customFormFieldsComponents = [
  {
    componentsTargeted: [{ components: [FieldTypes.Section] }],
    ComponentToRender: FormWrapperSection,
  },
  {
    componentsTargeted: [{ components: [customFormFields.downloadLink] }],
    ComponentToRender: CustomDownloadLink,
  },
  {
    componentsTargeted: [{ components: [FieldTypes.Button] }],
    ComponentToRender: FormButtonContainer,
  },
  {
    componentsTargeted: [{ components: [customFormFields.recaptcha] }],
    isVoid: true,
  },
  {
    componentsTargeted: [{ components: [customFormFields.checkbox, FieldTypes.Checkbox] }],

    ComponentToRender: CustomCheckbox,
  },
  {
    componentsTargeted: [
      {
        components: [customFormFields.radioButtonList, FieldTypes.RadioButtonList],
      },
    ],
    ComponentToRender: CustomRadioButtonList,
  },
  {
    componentsTargeted: [{ components: [customFormFields.checkboxList, FieldTypes.CheckboxList] }],
    ComponentToRender: CustomCheckboxList,
  },
  {
    componentsTargeted: [
      { components: [customFormFields.dropdownList, FieldTypes.DropdownList] },
      { components: [customFormFields.countryDropdown], type: 'country' },
    ],
    ComponentToRender: CustomDropdown,
  },
  {
    componentsTargeted: [
      {
        components: [
          customFormFields.singleLineText,
          FieldTypes.SingleLineText,
          customFormFields.singleLineTextWithdDataLayers,
        ],
      },
      { components: [FieldTypes.Email, customFormFields.emailWithDataLayers], type: 'email' },
      { components: [FieldTypes.Password], type: 'password' },
      {
        components: [customFormFields.number, FieldTypes.NumberField],
        fieldProps: { pattern: inputPatterns.number }, // regex
        type: 'number',
      },
      {
        components: [FieldTypes.Telephone, customFormFields.PhoneNumber],
        type: 'tel',
        fieldProps: { pattern: inputPatterns.phone },
      },
    ],
    ComponentToRender: CustomSingleLineText,
  },
  {
    componentsTargeted: [
      { components: [FieldTypes.FileUpload, customFormFields.uploadFieldWithDataLayers] },
    ],
    ComponentToRender: CustomFileUpload,
  },
  {
    componentsTargeted: [{ components: [customFormFields.slider] }],
    ComponentToRender: CustomSlider,
  },
  // {
  //   componentsTargeted: [{ components: [customFormFields.stepper] }],
  //   ComponentToRender: FormStepper,
  // },
  {
    componentsTargeted: [{ components: [FieldTypes.DateField] }],
    ComponentToRender: CustomDatePicker,
  },
  {
    componentsTargeted: [
      {
        components: [FieldTypes.MultipleLineText, customFormFields.multipleLineTextWithDataLayers],
      },
    ],
    ComponentToRender: CustomMultipleLineText,
  },
];
