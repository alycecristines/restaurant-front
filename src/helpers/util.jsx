import $ from 'jquery';
import swal from 'sweetalert';

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize;
    var end = Math.min(begin + sliceSize, bytesLength);

    var bytes = new Array(end - begin);
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export function pedidoDetailsOpen() {
  $('#right-sidebar').toggleClass('sidebar-open');
}

export function pedidoDetailsClose() {
  $('.dropdown-toggle').on('click', function captureEvent() {
    $('#right-sidebar').removeClass('sidebar-open');
  });
}

export function isCheckWeight(size) {
  if (size <= 120000) {
    return true;
  } else {
    swal('É permitido apenas imagens abaixo de 1.5 MBs.', { icon: 'warning' });
  }
}

export function isCheckImageFormat(type) {
  if (type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg') {
    return true;
  } else {
    swal('São permitidos somente arquivos do tipo JPG, JPEG ou PNG.', { icon: 'warning' });
  }
}
