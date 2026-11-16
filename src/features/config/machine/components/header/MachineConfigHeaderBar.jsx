import { useTranslation } from 'react-i18next';
import PageHeaderBar from '../../../../../components/common/PageHeaderBar';

export default function MachineConfigHeaderBar() {
  const { t } = useTranslation('machine');

  return (
    <PageHeaderBar
      breadcrumbs={[
        { label: t('header.breadcrumbConfig'), isCurrent: false },
        { label: t('header.breadcrumbMachineConfig'), isCurrent: true }
      ]}
      title={t('header.title')}
      badge={t('header.badge')}
      badgeType="brand"
      description={t('header.description')}
      showFullscreen={true}
    />
  );
}
