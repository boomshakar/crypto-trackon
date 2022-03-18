import React, { useState } from 'react';
import DataTable from '../dataTable';

const WishlistTable = () => {
  const [wishlistDataTBL, setWishlistDataTBL] = useState([]);
  return (
    <>
      <DataTable dataTBL={wishlistDataTBL} />
    </>
  );
};

export default WishlistTable;
