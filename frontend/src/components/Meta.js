import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={desc} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'Cindita\'s Tiendita',
  desc: 'Cindy\'s art, activism, and craft store',
  keywords: 'Cindy\'s Tienda, Community Activist, Hip Hop'
}

export default Meta
