import { useAppContext } from '../../context/LanguageContext';
import './Footer.scss'
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useAppContext();

  return (
    <footer className={`footer ${theme}`}>
      <p>&copy; 2025 BookIt. {t("footer.all_rights_reserved")}</p>
    </footer>
  );
};

export default Footer;
