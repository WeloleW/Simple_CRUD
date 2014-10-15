
$(function(){       // when the page loads

    var $main = $("#main");
    var $Product = $("#Product");
    var $table = $main.find("table").find('tbody');

    // Input
    function create(id, title, description, photo){
        var $product, $photo;
        $table.append('<tr class="product-"' + id + '></tr>');
        $product = $table.find('tr:last');
        $product.append('<td class="photo"></td>');
        $product.find("td:last").html('<img src=' + photo + '>');
        $product.append('<td class="title">' + title + '</td>');
        $product.append('<td class="description">' + description + '</td>');
        $product.append('<td class="delete">X</td>');

        // Events
        $product.find('.delete').on("click" ,function(){
            confirm("Are you sure you want to delete this product?", function(result) {
                if(result){
                    api.del(id);
                }
            });
        })
        $product.on("click" ,read);
    }
    function read(event){
        var title, description, photo;

        // Find title, description and photo
        title = $(event.currentTarget).find('.title').html();
        description = $(event.currentTarget).find('.description').html();
        photo = $(event.currentTarget).find('.photo').html();

        // Insert
        $Product.find('#ProductLabel').html(title);
        $Product.find('.photo').html(photo);
        $Product.find('.description').html(description);

        $Product.modal()
    }
    function update(id, title, description, photo){
        var $product;
        $product = $table.find('.product-' + id);

        $product.find('.photo').html('<img src=' + photo + '>');
        $product.find('.title').html(title);
        $product.find('.description').html(description);
    }
    function del(id){
        $table.find('.product-' + id).remove();
    }
    // /Input

    // Output
    var api = function(){};

    api.create = function(title, description, photo){
        $.ajax({
            type: "POST",
            processData: false,
            contentType: 'application/json',
            url: "/jax-rs-boilerplate-0.1/api/product",
            data: JSON.stringify({
                'title': title,
                'description': description,
                'photo': photo
            })
        })
    };
    api.update = function(id, title, description, photo){
        $.ajax({
            type: "PUT",
            processData: false,
            contentType: 'application/json',
            url: "/jax-rs-boilerplate-0.1/api/product/" + id,
            data: JSON.stringify({
                'title': title,
                'description': description,
                'photo': photo
            })
        })
    };
    api.del = function(id){
        $.ajax({
            type: "DELETE",
            processData: false,
            contentType: 'text/plain',
            url: "/jax-rs-boilerplate-0.1/api/product/" + id,
            data: "a"
        })
    };
    // !!!!!!!! Доделать !!!!!!!!!
    api.up = function(){
        $.ajax({
            type: "GET",
            processData: false,
            contentType: 'text/plain',
            accept: 'application/json',
            url: "/jax-rs-boilerplate-0.1/api/product/",
            data: "a",
            success: function (up) {
            }
        })
    };
    // /Output
});