import CookieBotScript from 'subComponents/SEO/CookieBotScript';

export const Default = (props) => {
  const { fields } = props;
  const { domainGroupID, language } = fields;

  return <CookieBotScript local={language?.value} domainGroupID={domainGroupID?.value} />;
};
