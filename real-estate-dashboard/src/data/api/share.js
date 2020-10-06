import { post } from './api';
import copy from 'copy-to-clipboard';

function copyShareLink(listingId, recipientEmail) {
  post(`/share/${listingId}`, { with: recipientEmail })
    .then((resp) => resp.json())
    .then((resp) => {
      copy(resp.url);
    });
}

export {
  copyShareLink
};
