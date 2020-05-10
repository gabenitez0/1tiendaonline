import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
        document.body.scrollTop = 0;
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return (
    <>
      {children}
    </>
  );
}

export default withRouter(ScrollToTop);