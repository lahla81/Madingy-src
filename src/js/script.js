$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-product]').click(function(){
    window.location = 'product.html';
  })
  $('[data-add-to-cart]').click(function(){
    alert('أضيف الي العربة');
  })
  $('.product-option input[type="radio"]').change(function(){
    $(this).parents('.product-option').siblings().removeClass('active');
    $(this).parents('.product-option').addClass('active');
  })
  $('[data-remove-from-cart]').click(function(){
    $(this).parents('[data-product-info]').remove();
    calculateTotalPrice();
  })
  $('[data-product-quantity]').change(function(){
    var newQuantity = $(this).val();
    var $parent = $(this).parents('[data-product-info]');
    var pricePerUnit = $parent.attr('data-product-price');
    var dataPriceForProduct = newQuantity * pricePerUnit;
    $parent.find('.total-price-for-product').text(dataPriceForProduct + '$');
    calculateTotalPrice();
  });
  function calculateTotalPrice(){
    var totalPriceForAllProducts=0;
    $('[data-product-info]').each(function(){
      var pricePerUnit = $(this).attr('data-product-price');
      var quantity = $(this).find('[data-product-quantity]').val();
      var totalPriceForProduct = quantity * pricePerUnit;
      totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
    })
    $('#total-price-for-all-products').text(totalPriceForAllProducts +'$');
    if(totalPriceForAllProducts === 0){
      $('#form-checkout button[type="submit"]').prop('disabled',true);
    }
  }
  var citiesByCountry = {
    Sa:[
      'الرياض',
      'جدة',
    ],
    Eg:[
      'القاهرة',
      'الإسكندرية',
      'البحيرة',
    ],
    Jo:[
      'عمان',
      'الزرقا',
    ],
    Sy:[
      'دمشق',
      'حلب',
      'حمص'
    ],
  };
  //عندما يتغير البلد
  $('#form-checkout select[name="country"]').change(function(){
  //أجلب رمز البلد
  var country = $(this).val();
  //أجلب مدن هذا البلد
  var cities = citiesByCountry[country];
  //أضف مدن هذا البلد إلي قائمة المدن
  $('#form-checkout select[name="city"]').empty(); 
  $('#form-checkout select[name="city"]').append('<option selected disabled value="">اختر المدينة</option>') ;
  // من أجل كل مدينة
  cities.forEach(function(city){
  // إنشاء حقل إختيار جديد
  var $newOption = $('<option></option>');
  // إضافة النص
  $newOption.text(city);
  // إضافة القيمة
  $newOption.val(city);
  // إضافة إلي حقل المدينة
  $('#form-checkout select[name="city"]').append($newOption);
  });
});
  $('#form-checkout input[name="payment_method"]').change(function(){
    var paymentMethod = $(this).val();
    if(paymentMethod === 'on_delivery'){
      $('#credit_card_info input').prop('disabled' , true);
    }
    else{
      $('#credit_card_info input').prop('disabled' , false);
    }
    $('#credit_card_info').toggle();
  })

});

