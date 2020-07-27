function getSelection(textbox) {
   var selectedText = null;
   var activeElement = document.activeElement;

   // all browsers (including IE9 and up), except IE before version 9
   if (
      window.getSelection &&
      activeElement &&
      (activeElement.tagName.toLowerCase() == 'textarea' ||
         (activeElement.tagName.toLowerCase() == 'input' && activeElement.type.toLowerCase() == 'text')) &&
      activeElement === textbox
   ) {
      var startIndex = textbox.selectionStart;
      var endIndex = textbox.selectionEnd;

      if (endIndex - startIndex > 0) {
         var text = textbox.value;
         selectedText = text.substring(textbox.selectionStart, textbox.selectionEnd);
      }
   } else if (document.selection && document.selection.type == 'Text' && document.selection.createRange) {
      // All Internet Explorer
      var range = document.selection.createRange();
      selectedText = range.text;
   }

   return selectedText;
}
function isTextSelected(input) {
   var text = getSelection(input);

   if (text == null || text.length == 0) text = 'nothing returned';

   return text;
}
export default isTextSelected;
