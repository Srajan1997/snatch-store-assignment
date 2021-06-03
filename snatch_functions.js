
                //INITIALISED DATA STRUCTURES ---@SRAJAN CHANSORIYA
                var classCounter=-1;
                var chosenClass = '';
                var categoryArray = ['Home Decor & Furniture', 'Clothes & Fashion', 'Electronics & Gadgets', 'Books & Stationary', 'Grocery & Confectionary'];
                 var categoryDB = ['home','fashion','gadget','books','grocery'];
                var his_array = [];
                var offset=0;
                var category='all';
                var product_array = [];
                var low = 0;
                var high = 9999999999999;
                var filter = 0; //FILTERS: [ 0: relevance | 1: price_asc | 2: price_dsc | 3: date_asc | 4: date_dsc ]
                var uploaded_file_name='snatch_default.png';   var index = [];
                var userProducts;
                var cart_array = [];
                var cart_items = [];


                //helper toTitleCase Function ---@SRAJAN CHANSORIYA
        function toTitleCase(str) {
                str = str.toString();
          return str.replace(
            /\w\S*/g,
            function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
          );
        }
                 //Register User Function ---@SRAJAN CHANSORIYA
                function registerUser(){
                        var name = document.getElementById('name_register').value;
                        var pass = document.getElementById('pass_register').value;
                        var city = document.getElementById('city_register').value;
                        var email = document.getElementById('email_register').value;
        
                        fetch('http://127.0.0.1:5000/register',  {
                method: 'POST',
                body: JSON.stringify({"email": email, "password":pass, "city":city, "name":name }),
                headers: {'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then(function(data) {
                console.log(data);
                if(data.code==200) 
                {
                        document.getElementById('name_register').value='';
                        document.getElementById('pass_register').value='';
                        document.getElementById('city_register').value='';
                        document.getElementById('email_register').value='';
                        showLogin();
                        snatchAlert("Account created Successfully! Please Login to continue.",1);
                }
                if(data.code==-4)
                {
                        snatchAlert("Snatch Servers currently unreachable! Please try again later.",0)
                }
            })
            .catch(error => {
                console.error('Error:', error)
            });
        }
        
        
      
        
         //Category Change in ADD PRODUCTS Function ---@SRAJAN CHANSORIYA
        function switchClass(){
        classCounter++;
        classCounter%=5;
        document.getElementById('classChooser').innerHTML = "Category: " + categoryArray[classCounter];
        chosenClass = categoryDB[classCounter];
        console.log(chosenClass);
        }
        
        //USER LOGIN Function ---@SRAJAN CHANSORIYA
        function loginUser(){
                        var pass = document.getElementById('pass_login').value;
                        var email = document.getElementById('email_login').value;
                        
                        fetch('http://127.0.0.1:5000/login',  {
                method: 'POST',
                body: JSON.stringify({"email": email, "password":pass }),
                headers: {'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then(function(data) {
                console.log(data);
                if(data.code==200)
                {
                        window.localStorage.setItem('token', data.token);
                        window.localStorage.setItem('email', email);
                        window.localStorage.setItem('cart',data.cart)
                        console.log(window.localStorage);
                        document.getElementById('pass_login').value = '';
                        document.getElementById('email_login').value='';
                        snatchAlert("Welcome to Snatch! Your Password has been verified.", 1);
                        showProducts();
                        document.getElementById('sell').style.display="";
                        document.getElementById('power').style.display="";
                }
                if(data.code==-1)
                {
                        snatchAlert("Wrong Password! Please try again.",-1)
                }
                if(data.code==-4)
                {
                        snatchAlert("Snatch Servers currently unreachable! Please try again later.",0)
                }
            })
            .catch(error => {
                console.error('Error:', error)
            });
        }
        
               
        //UPLOAD PRODUCT DETAILS Function ---@SRAJAN CHANSORIYA
                function uploadProduct () {
                        var name = document.getElementById('up_name').value;
                        var mrp =(document.getElementById('up_mrp').value);
                        var price = (document.getElementById('up_price').value);
                        var des = document.getElementById('up_des').value;
                        var co1 = typeof(name)=="string"?1:0;
                        var co4 = mrp-price>=0?1:0;
                        console.log(chosenClass);
                        console.log(classCounter);
                        var co5 =  true; //(des.length>200&&des.length<500)?1:0;
                        if(name.length==0 || mrp.length==0 || price.length==0 || des.length==0)
                        {
                        snatchAlert("All fields are Required!",0);
                        }
                        else if((!(co1&&co4&&co5))||uploaded_file_name==='snatch_default.png')
                        {
                                var warn = '';
                                if(!co1) warn+=" Please provide a valid name. \n";
                                if(!co4) warn+=" Items cannot be sold at prices greater than MRP. \n";
                                if(!co5) warn+=" Please provide a suitably long Description (200-500 Characters) \n";
                                if(uploaded_file_name==='snatch_default.png') warn+=" Product Image is mandatory to create listing.\n"
                                snatchAlert(warn,-1);
                        }
                         else
                         {
                                var auth = window.localStorage.getItem('token').toString();
                                var myHeaders = new Headers();
                                myHeaders.append('Authorization', auth);
                                myHeaders.append('Content-Type', 'application/json');
                                buildIndex(name, des);
        
        
                                fetch('http://127.0.0.1:5000/addProduct',  {
                method: 'POST',
                body: JSON.stringify({"name": name, "mrp":mrp, "price":price, "des":des, "image": uploaded_file_name, "index": index, "category": chosenClass }),
                headers: myHeaders,
            })
            .then(response => response.json())
            .then(function(data) {
                console.log(data);
                if(data.code==200) 
                {
                        document.getElementById('up_name').value='';
                        document.getElementById('up_price').value='';
                        document.getElementById('up_mrp').value='';
                        document.getElementById('up_des').value='';
                        document.getElementById('classChooser').innerHTML='Select Category';
                        uploaded_file_name='snatch_default.png';
                        index = [];
                        showProfile();
                        snatchAlert("Product was successfully added to Snatch Product Listing.",1);
                        window.localStorage.removeItem('collectedIndex');
                        window.localStorage.removeItem('minIndex');
                        getIndex();
                }
                if(data.code==-4)
                {
                        snatchAlert("Snatch Servers currently unreachable! Please try again later.",0)
                }
                if(data.code==55)
                {
                        logout(2);
                }
            })
            .catch(error => {
                    snatchAlert("Snatch Servers Unreachable. Please try again later.",-1)
                console.error('Error:', error)
            });
                         }
        
                }
        
         
        //Only Unique SEARCH INDEXING Helper Function ---@SRAJAN CHANSORIYA
                function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }


        //BUILD SEARCH INDEXING Helper Function ---@SRAJAN CHANSORIYA
                function buildIndex(product_name,product_description) {
        index = [];
          var str = product_name.toLowerCase() + " " + product_description.toLowerCase();
          str = str.replace("!"," ");
          str = str.replace("?", " ");
          str = str.replace(/\./g,' ');
          str = str.replace("'", " ");
          str = str.replace("[", " ");
          str = str.replace("]", " ");
          str = str.replace("(", " ");
          str = str.replace(")", " ");
          str = str.replace("/", " ");
          str = str.replace(",", " ");
          str = str.replace(":", " ");
          str = str.replace(";", " ");
          var res = str.split(" ");
          var split=[];
          for(var i=0; i<res.length;i++)
          if(res[i].length>=1 && (res[i].toLowerCase()!='this' && res[i].toLowerCase()!='that' && res[i].toLowerCase()!='the' && res[i].toLowerCase()!='then' && res[i].toLowerCase()!='though' && res[i].toLowerCase()!='thus' && res[i].toLowerCase()!='thats' && res[i].toLowerCase()!='why' && res[i].toLowerCase()!='where' && res[i].toLowerCase()!='how' && res[i].toLowerCase()!='therefore' && res[i].toLowerCase()!='hence' && res[i].toLowerCase()!='since' && res[i].toLowerCase()!='not' && res[i].toLowerCase()!='is' && res[i].toLowerCase()!='are' && res[i].toLowerCase()!='to')) 
          {
                var word = res[i].toLowerCase();
          split.push(word);
          split.push(word.replace('-',' '));
          if(word[word.length-1]==='s') split.push(word.substring(0, word.length-1));
          }
          index = split.filter(onlyUnique);
          console.log(index);
        }
        
        //Product Edit Loader Function ---@SRAJAN CHANSORIYA
                function editProduct (id2edit) {
                        var name = document.getElementById('up2_name').value;
                        var mrp =(document.getElementById('up2_mrp').value);
                        var price = (document.getElementById('up2_price').value);
                        var des = document.getElementById('up2_des').value;
                        var co1 = typeof(name)=="string"?1:0;
                        var co4 = mrp-price>=0?1:0;
                        var co5 =  true; //(des.length>200&&des.length<500)?1:0;
                        if(name.length==0 || mrp.length==0 || price.length==0 || des.length==0)
                        {
                        snatchAlert("All fields are Required!",0);
                        }
                        else if((!(co1&&co4&&co5))||uploaded_file_name==='snatch_default.png')
                        {
                                var warn = '';
                                if(!co1) warn+=" Please provide a valid name. \n";
                                if(!co4) warn+=" Items cannot be sold at prices greater than MRP. \n";
                                if(!co5) warn+=" Please provide a suitably long Description (200-500 Characters) \n";
                                if(uploaded_file_name==='snatch_default.png') warn+=" Product Image is mandatory to create listing.\n"
                                snatchAlert(warn,-1);
                        }
                         else
                         {
                                var auth = window.localStorage.getItem('token').toString();
                                var myHeaders = new Headers();
                                myHeaders.append('Authorization', auth);
                                myHeaders.append('Content-Type', 'application/json');
        
        
                                fetch('http://127.0.0.1:5000/editProduct',  {
                method: 'POST',
                body: JSON.stringify({"name": name, "mrp":mrp, "price":price, "des":des, "image": uploaded_file_name, "id": id2edit }),
                
                headers: myHeaders,
            })
            .then(response => response.json())
            .then(function(data) {
                console.log(data);
                if(data.code==200) 
                {
                        document.getElementById('up2_name').value='';
                        document.getElementById('up2_price').value='';
                        document.getElementById('up2_mrp').value='';
                        document.getElementById('up2_des').value='';
                        uploaded_file_name='snatch_default.png';
                        showProfile();
                        snatchAlert("Product Specifications have been successfully Updated!.",1)
                }
                if(data.code==-4)
                {
                        snatchAlert("Snatch Servers currently unreachable! Please try again later.",0)
                }
            })
            .catch(error => {
                    snatchAlert("Snatch Servers Unreachable! Please try again later.",-1)
                console.error('Error:', error)
            });
                         }
        
                }
    
        //Upload Photo to CLOUDINARY HOSTING Function ---@SRAJAN CHANSORIYA
        function uploadPhoto () {
                var inputIU = document.getElementById("iu-input");
                console.log(inputIU.files[0].name)
          var photo = new FormData();
          photo.append("upload_preset", "qzycynwj");
          photo.append("cloud_name","cmpdi")
          photo.append("file", inputIU.files[0]);
                fetch("https://api.cloudinary.com/v1_1/cmpdi/image/upload", {
              method: "POST",
              body: photo
            })
              .then((response) => {
                return response.text();
              })
              .then((data) => {
               console.log(data);
               data = JSON.parse(data);
               uploaded_file_name=data.url;
               console.log(uploaded_file_name);
              });
        }
        
       
        //Load Profile and Added Products Function ---@SRAJAN CHANSORIYA
                function showProfile(){
                        if(window.localStorage.getItem('token'))
                        {
                        console.log("SHOW PROFILE CALLED")
                        var auth = window.localStorage.getItem('token').toString();
                        var myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json');
                        myHeaders.append('Authorization', auth);
                    fetch("http://127.0.0.1:5000/profile",  {
                method: 'GET',
                headers: myHeaders,
            })
            .then(response => response.json())
                .then(function(data){ 
                        if(data.code==200)
                        {
                    pdata = data.product;   
                    userProducts = pdata;   
                    data = data.profile[0];
                    var time = data.created_at.toString().substring(0,4);
                   var profile = '<i class="fas fa-arrow-left back" style="cursor:pointer;color: black;z-index: 100;position: fixed;top:50px;left:30px;font-size:24px;" onclick="goBack()" ></i>';
                profile+= '<div class="profile_bar"><div class="profile_img" style="background-size:cover;background-position:center;background-repeat:no-repeat;background-color:gray;background-image:url(\'snatch_avatar.png\')"></div><div class="profile_name">'+ toTitleCase(data.name)+'</div><div class="profile_city">'+ data.city +'</div><div class="profile_age">Member since '+ time +'</div></div>';
                data = pdata;
                console.log(data);
                if(data.length===0)
                {
                        profile+='<div style="background-size:contain;background-position:center;background-repeat:no-repeat;height:400px;width:auto;background-image:url(\'profile_banner.png\')"></div><div style="font-size:24px;color:gray;"><br><bR>Engage the power of E-Commerce. <br>Start selling with Snatch today!</div>'
                }
                for(var i=0; i<data.length;i++)
                {
                        profile+='<div id="'+ data[i].product_id +'" class="up_card"><div class="up_image" style="background-image:url(\'' + data[i].product_image + '\')"></div><div class="up_edit" ><i class="fas fa-trash-alt" onclick="deleteProduct('+data[i].product_id+')"></i>&emsp;<i onclick="showEdit('+ i +')" class="fas fa-pen"></i></div><div class="up_details"><div class="up_name">'+ toTitleCase(data[i].product_name) +'</div><div class="up_price">Snatch Price: &#8377;'+ data[i].product_price +'</div><div class="up_category">Category: '+ toTitleCase(data[i].category)+'</div></div></div>'
                }
                profile+="<div style='height:400px;width:100%;background-color:transparent'></div>"
                document.getElementById('profile-section').innerHTML = profile;
                }
                else   if(data.code==55)
                {
                        logout(2);
                }
        })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('products-section').innerHTML+= '<img width="30%" height="auto" src="cart_banner.png"><br><Br><p style="font-size:20px;color:gray">Looks like we lost the connection!</p><br><br><div class="big_block" onclick="javascript: window.location.reload()" ><div class="load_more" style="width:50%;cursor:pointer" >RETRY CONNECTION</div></div>';
                });
        
                document.getElementById('products-section').style.display='none';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
        }
        else showLogin();
                }
        //Longest Common Substring --COPIED ---@SRAJAN CHANSORIYA
                function longest_common_starting_substring(arr1){
          const arr= arr1.concat().sort();
          const a1= arr[0];
          const a2= arr[arr.length-1];
          const L= a1.length;
          let i= 0;
          while(i< L && a1.charAt(i)=== a2.charAt(i)) i++;
          console.log(arr1 + " = " + a1.substring(0, i));
          return a1.substring(0, i).length;
        }
        
          
        var minIndex=[];

        //Load Search Index ---@SRAJAN CHANSORIYA
                function getIndex(){
        
                        if(window.localStorage.getItem('collectedIndex')==null)
                        fetch("http://127.0.0.1:5000/index",  {
                method: 'GET',
            })
            .then(response => response.json())
                .then(function(data){ 
                    console.log(data);
                    for(var i=0; i<data.length;i++)
                    {
                            minIndex.push(data[i].product_name);
                    }
                    
                    collectedIndex = new Object;
                    minIndex = minIndex.filter(onlyUnique);
                    for(var j=0; j<minIndex.length;j++)
                    {
                            var itemTags = [];
                    for(var i=0; i<data.length;i++)
                    {
                            if(data[i].product_name == minIndex[j])
                            {
                                    itemTags.push(data[i].tag_name);
                            }
                    }
                    collectedIndex[minIndex[j]] = itemTags;
                }
                console.log(collectedIndex);
                console.log("This is min Index: ",minIndex);
                window.localStorage.setItem("minIndex",JSON.stringify(minIndex));
                window.localStorage.setItem("collectedIndex",JSON.stringify(collectedIndex));
                    })
            .catch(error => {
                console.error('Error:', error);
                });
            }
        
        //Initialise Search Function ---@SRAJAN CHANSORIYA
            function searchTerm(){
        
                collectedIndex = JSON.parse(window.localStorage.getItem('collectedIndex'));
                minIndex = JSON.parse(window.localStorage.getItem('minIndex'));
                console.log("This is min Index: ",minIndex);
                        var term = document.getElementById('search_bar').value;
                        var term_array = term.split(' ');
                        console.log(term_array);
                        var powerObject = new Object;
                        console.log(minIndex);
                        for(var i=0; i<minIndex.length;i++)
                        {
                                var w_match = 0, c_match = 0;
                                for(var j=0; j<term_array.length; j++)
                                {
                                        var search_term = term_array[j].toLowerCase();
                                        var tags_array = collectedIndex[minIndex[i]];
                                        
                                        for(var k=0; k<tags_array.length;k++)
                                        {
                                                console.log("Colliding " + search_term + " against " + tags_array[k].toLowerCase());
                                                if(search_term===tags_array[k].toLowerCase()) 
                                        {
                                                console.log("Word Matched: ", search_term);
                                                w_match++;
                                                c_match+=(search_term.length);
                                        }
                                        else c_match+= longest_common_starting_substring([search_term.toLowerCase(), tags_array[k].toLowerCase()]);
                                        }
                                }
                                        if(Math.pow(c_match,w_match) + c_match/100 > 1.1)
                                        {
                                        powerObject[minIndex[i]] = 
                                        console.log(Math.pow(c_match,w_match) + c_match/100);
                                        }
                        }
                                 console.log(powerObject);
                                 var searchResults = Object.entries(powerObject).sort((a,b)=>b[1]-a[1]).map(el=>el[0]);
                                 var sr = [];
                                 for(var i=0; i<searchResults.length;i++)
                                 {
                                         sr.push(searchResults[i]);
                                 }
                                 callData(sr);
                                        }
        
        //Calling Searched Products AS PER RELEVANCE Function ---@SRAJAN CHANSORIYA
                function callData(searchResults)
                {
                        console.log(searchResults);
                        var myHeaders = new Headers();
                                myHeaders.append('Content-Type', 'application/json');
                                fetch('http://127.0.0.1:5000/callData',  {
                method: 'POST',
                body: JSON.stringify({"products": searchResults }),
                headers: myHeaders,
                                })
            .then(response => response.json())
            .then(function(data){
        
                console.log(data);
        
                document.getElementById('products-section').style.display='';
                document.getElementById('products-section').innerHTML='  <i class="fas fa-arrow-left back" style="cursor:pointer;color: black;z-index: 100;position: fixed;top:50px;left:30px;font-size:24px;" onclick="javascript: window.location.reload()" ></i>';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
                product_array=[];
                if(data.length>0)
                    {
                        for(var i=0; i<data.length; i++)
                        {
                                product_array.push(data[i]);
                                var new_product = '<div onclick="viewProduct('+ (product_array.length-1)  +')" class="card" id="'+ data[i].product_id  +'"><div class="card-img" style="background-image:url(\''+ data[i].product_image +'\') !important;background-position:center !important;"></div><div class="card-title">' + data[i].product_name +'</div><div class="card-price">&#8377; ' + data[i].product_price +'</div><div class="product-badge"></div><div class="product-buy" onclick="addToCart('+ (product_array.length-1) +')"></div></div>';
                               
                                document.getElementById('products-section').innerHTML+= new_product;
                        }
                        document.getElementById('products-section').innerHTML+= '<div class="big_block" ><div class="load_more" style="background-color:grey;cursor:not-allowed" >NO MORE ITEMS TO LOAD</div></div>';
                }
                else
                {
                        document.getElementById('products-section').innerHTML+= '<img width="50%" height="auto" src="search_banner.png"><br><p style="font-size:20px;color:gray">What about trying something else?</p><div class="big_block" ><div class="load_more" style="background-color:grey;cursor:not-allowed" >NO MATCHING RESULTS FOUND</div></div>';
                }
                    })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('products-section').innerHTML+= '<div class="big_block" onclick="javascript: window.location.reload()" ><div class="load_more" style="background-color:pink;cursor:" >ERROR: PLEASE RELOAD PAGE</div></div>';
                });
            }
        
          //Show product Edit Page ---@SRAJAN CHANSORIYA
                function showEdit(id){
                        
                        console.log("Show edit called: ",id);
                        document.getElementById('products-section').style.display='none';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='';
                document.getElementById('pc').setAttribute('onclick','editProduct('+userProducts[id].product_id+')')
                document.getElementById('up2_name').value = userProducts[id].product_name.toString();
                document.getElementById('up2_mrp').value = parseInt(userProducts[id].product_mrp);
                document.getElementById('up2_price').value = parseInt(userProducts[id].product_price);
                document.getElementById('up2_des').value = userProducts[id].product_description.toString();
        }
          //Calling Products UploadScreen ---@SRAJAN CHANSORIYA
                function showAdd(){
                        if(window.localStorage.getItem('token'))
                        {
                        console.log("SHOW ADD CALLED")
                        document.getElementById('products-section').style.display='none';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='';
                document.getElementById('edit-section').style.display='none';
                        }
                        else 
                        {
                                showLogin();
                                snatchAlert("Please Login to access your seller Account on Snatch!",0);
                        }
                       
                }
                function showLogin(){
                        console.log("SHOW LOGIN CALLED")
                        document.getElementById('products-section').style.display='none';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
                }
        
                function clickUpload(){
                        document.getElementById('iu-input').click();
                }
        
                function goBack(){
                        showProducts();
                }
                 function loadProducts() {
                         his_array.push('products');
                 console.log("Attempting to load Products");
                 document.getElementById('products-section').style.display='';
                 document.getElementById('products-section').innerHTML+='<img style="margin-top:30%" id="loader" src="spinner.gif">';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
        
                    fetch("http://127.0.0.1:5000/products?category="+category+'&offset='+offset+'&filter='+filter+'&low='+low+'&high='+high,  {
                method: 'GET',
            })
            .then(response => response.json())
                .then(function(data){ 
                    console.log(data);
                    document.getElementById('loader').style.display = 'none';
                    if(data.length>0)
                    {
                        for(var i=0; i<data.length; i++)
                        {
                                product_array.push(data[i]);
                                var new_product = '<div onclick="viewProduct('+ (product_array.length-1)  +')" class="card" id="'+ data[i].product_id  +'"><div class="card-img" style="background-image:url(\''+ data[i].product_image +'\') !important;background-position:center !important;"></div><div class="card-title">' + data[i].product_name +'</div><div class="card-price">&#8377; ' + data[i].product_price +'</div><div class="product-badge"></div><div class="product-buy" onclick="addToCart('+ (product_array.length-1) +')"></div></div>';
                               
                                document.getElementById('products-section').innerHTML+= new_product;
                        }
                        document.getElementById('products-section').innerHTML+= '<div class="big_block" id="lm_big" onclick="loadMore()"><div class="load_more">LOAD MORE</div></div>';
                }
                else document.getElementById('products-section').innerHTML+= '<div style="height:30vh;"></div><img width="35%" height="auto" src="shop_banner.png"><br><p style="font-size:20px;color:gray">Money can’t buy happiness.<br> For everything else, there is Snatch!</p><div class="big_block" ><div class="load_more" style="background-color:grey;cursor:not-allowed" >NO MORE ITEMS TO LOAD</div></div>';
                    })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('products-section').innerHTML+= '<br><br><br><br><img width="40%" height="auto" src="snatch_black.png"><br><BR><BR><p style="font-size:20px;color:gray">Your Demands. Our Passion!</p><br><br><div class="big_block" onclick="javascript: window.location.reload()" ><div class="load_more" style="width:50%;cursor:pointer" >UNDER MAINTENANCE | RETRY CONNECTION</div></div>';
                });
            }
        
            function showProducts()
            {
                document.getElementById('products-section').style.display='';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
            }
        
            function showRegister()
            {
                    if(window.localStorage.getItem('email'))
                    {
                        document.getElementById('products-section').style.display='none';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
                    }
                    else{
                        document.getElementById('products-section').style.display='none';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
                    }
            }
        
            function switchCategory(cat){
                        offset=0;
                        category = cat;
                        product_array=[];
                        document.getElementById('products-section').innerHTML='';
                        loadProducts();
                }
                var si=-1;
                function switchSort()
                {
                        si++;
                        si%=5;
                        var sortOrders = ['Most Relevant First', 'Lowest Price First', 'Highest Price First', 'Latest Trends First', 'Oldest Trends First'];
                        filter=si;
                        document.getElementById('ss').innerHTML = sortOrders[si];
        
                }
                var toggleFilters = false;
                function resetSort()
                {
                        console.log("RESET CALLED");
                        document.getElementById('af').innerHTML="APPLY";
                                document.getElementById('af').setAttribute('onclick','applyFilters()');
                        filter=0;
                        si=-1;
                        high = 999999999;
                        low = 0;
                        document.getElementById('ss').innerHTML = "Sorting Scheme";
                        document.getElementById('lp').value = '';
                        document.getElementById('hp').value = '';
        
                        product_array = [];
                                document.getElementById('products-section').innerHTML = '';
                                offset=0;
                                loadProducts();
                }
        
        function viewProduct(id){
                his_array.push(id);
                console.log()
                document.getElementById('products-section').style.display='none';
                document.getElementById('view-section').style.display='';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='none';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
                cart_array = JSON.parse(window.localStorage.getItem('cart'));
                var flag=0;
                if(!( JSON.parse(window.localStorage.getItem('cart'))===null))
                {
                cart_array = JSON.parse(window.localStorage.getItem('cart'));
        
                        console.log("This is cart_array: ",cart_array)
                        for(var i=0; i<cart_array.length;i++)
                        {
                                if(cart_array[i].product_id.toString()===product_array[id].product_id.toString()) flag=1;
                        }
                }
        
        
                document.getElementById('view-section').innerHTML= '<i class="fas fa-arrow-left back" style="cursor:pointer;color: black;z-index: 100;position: fixed;top:50px;left:30px;font-size:24px;" onclick="goBack()" ></i>';
                
                var data = product_array[id];
                                var new_product;
                                if(flag===0) new_product='<div class="left-view"><div class="product-image-view" style="background-image:url(\''+ data.product_image +'\');background-position:center;"></div><div class="addtocart button" id="gtc" onclick="addToCart(' + id +')">ADD TO CART</div><div class="checkoutnow button" onclick="show_animation()" id="btc">BUY THIS NOW</div></div><div class="right-view"><div class="product-title-view">'+data.product_name+' | &#8377;'+ data.product_price + '</div><div class="product-discount-view">MRP: &#8377;' + data.product_mrp + ' | Discount: &#8377;'+ (data.product_mrp-data.product_price) + ' ('+ parseInt(((data.product_mrp-data.product_price)/data.product_mrp)*100) + '%)</div><div class="product-description-view" style="margin-bottom:50px;">' + data.product_description + '</div></div>';
                               else new_product='<div class="left-view"><div class="product-image-view"style="background-image:url(\''+ data.product_image +'\'); background-position:center;"></div><div class="addtocart button" id="gtc" onclick="showCart()">GO TO CART</div><div class="checkoutnow button" onclick="show_animation()" id="btc">CHECKOUT NOW</div></div><div class="right-view"><div class="product-title-view">'+data.product_name+' | &#8377;'+ data.product_price + '</div><div class="product-discount-view">MRP: &#8377;' + data.product_mrp + ' | Discount: &#8377;'+ (data.product_mrp-data.product_price) + ' ('+ parseInt(((data.product_mrp-data.product_price)/data.product_mrp)*100) + '%)</div><div class="product-description-view" style="margin-bottom:50px;">' + data.product_description + '</div></div>';
                                document.getElementById('view-section').innerHTML+= new_product;
                                
                        }
        
        
                        function applyFilters(){
                                console.log("APPLY CALLED")
                                var setLow;
                                if(document.getElementById('lp').value.length==0 || document.getElementById('hp').value.length==0) snatchAlert("Please provide a Valid Value",0);
                                else 
                                {
                                var tl = 0; 
                                var th = 0;
                               
                                setLow = parseInt(document.getElementById('lp').value);
                                if(setLow<0 || typeof(setLow)==NaN || setLow===undefined || setLow=='') snatchAlert("Please Enter a Valid Value",0);
                                else tl = setLow;
                               
                                setHi = parseInt(document.getElementById('hp').value);
                                if(setHi<0 || typeof(setHi)==NaN || setHi===undefined || setHi=='') snatchAlert("Please Enter a Valid Value",0);
                                else th = setHi;
                               
                                if(tl>th) snatchAlert("Price Upper Bound must be higher than Price Lower Bound",-1);
                                else 
                                {
                                        high = th;
                                        low = tl;
                                product_array = [];
                                document.getElementById('products-section').innerHTML = '<i class="fas fa-arrow-left back" style="cursor:pointer;color: black;z-index: 100;position: fixed;top:50px;left:30px;font-size:24px;" onclick="goBack()" ></i>';
                                offset=0;
                                loadProducts();
        
                                document.getElementById('af').innerHTML="RESET";
                                document.getElementById('af').setAttribute('onclick','resetSort()');
                                }
                        }
                }
        
                function logout(id){
                        var cart = JSON.parse(localStorage.getItem('cart'));
                        var email = localStorage.getItem('email').toString();
                        
                        var myHeaders = new Headers();
                                myHeaders.append('Content-Type', 'application/json');
                        fetch('http://127.0.0.1:5000/logout',  {
                method: 'POST',
                body: JSON.stringify({"cart": cart , "email": email }),
                headers: myHeaders,
                                })
            .then(response => response.json())
            .then(function(data){
                    console.log(data.code);
        
                    if(data.code===200)
                    {
                        window.localStorage.removeItem('token');
                        window.localStorage.removeItem('email');
                        window.localStorage.removeItem('cart');
                        window.localStorage.removeItem('collectedIndex');
                        window.localStorage.removeItem('minIndex');
                        getIndex();
                        if(id==1) snatchAlert("You have Logged Out successfully! Your Cart data has been saved to Snatch Servers.",1);
                        if(id==2) snatchAlert("You were Logged out automatically to keep your data Safe! Please Login to continue.",0);
                        document.getElementById('profile-section').innerHTML='';
                        showLogin();
                    }
                    else if(data.code===-4)
                {
                        snatchAlert("Snatch Servers currently unreachable! Your cart has not been saved.",0);
                        showLogin();
                }
                else{
                        snatchAlert("You have Logged Out successfully! Your Cart data has been saved to Snatch Servers.",-1);
                        showLogin();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('products-section').innerHTML+= '<div class="big_block" onclick="javascript: window.location.reload()" ><div class="load_more" style="background-color:pink;cursor:" >ERROR: PLEASE RELOAD PAGE</div></div>';
                });
        
                      
                }
        
                function deleteProduct(id){
                        var auth = window.localStorage.getItem('token').toString();
                        var db_id = id;
                        var ui_id = -1;
                        for(var i=0; i<userProducts.length; i++)
                        {
                                if(userProducts[i].product_id==db_id) ui_id=i;
                        }
                        console.log("ui_id",ui_id);
                        userProducts.splice(ui_id,1);
                        var myHeaders = new Headers();
                                myHeaders.append('Authorization', auth);
                                myHeaders.append('Content-Type', 'application/json');
                                fetch('http://127.0.0.1:5000/delete',  {
                method: 'POST',
                body: JSON.stringify({"id": db_id }),
                headers: myHeaders,
                                })
            .then(response => response.json())
            .then(function(data){
                    if(data.code==200)
                    {
                        document.getElementById(id).remove();
                        snatchAlert("Item has been Deleted!",-1);
                    }
                    else{
                            snatchAlert('Snatch Servers Busy!',0)
                    }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('products-section').innerHTML+= '<div class="big_block" onclick="javascript: window.location.reload()" ><div class="load_more" style="background-color:pink;cursor:" >ERROR: PLEASE RELOAD PAGE</div></div>';
                });
        
        
        
                }
        
            function loadMore()
                {
                        document.getElementById('lm_big').remove();
                        document.getElementById('loader').remove();
                        offset+=12;
                        loadProducts();
                }
                switchCategory('all');
        
                function toggleFilter()
                {
                        if(!toggleFilters) showFilters();
                        else hideFilters();
                }
        
                function showFilters()
                {
                        toggleFilters = true;
                        document.getElementById('fb').style.display="";
                }
                function hideFilters()
                {
                        toggleFilters = false;
                        document.getElementById('fb').style.display="none";
                }
             
                function addToCart(id){
                if(!( JSON.parse(window.localStorage.getItem('cart'))===null))
                {
                        console.log("This is cart_array2: ",window.localStorage.getItem('cart'))
                cart_array = JSON.parse(window.localStorage.getItem('cart'));
                console.log("This is cart_array2: ",cart_array)
                }
                else cart_array = [];
                        var flag=1;
                        console.log("Adding to cart: ",product_array[id].product_id);
                        for(var i=0; i<cart_array.length;i++)
                        {
                                if(cart_array[i].product_id.toString()===product_array[id].product_id.toString()) flag=0;
                        }
                        if(flag) cart_array.push(product_array[id]);
                        else console.log("Item already added!");
                        window.localStorage.setItem("cart",JSON.stringify(cart_array));
                        console.log(JSON.parse(window.localStorage.getItem('cart')));
                        document.getElementById('btc').innerHTML = "CHECK OUT NOW";
                        document.getElementById('gtc').innerHTML = "GO TO CART";
                        document.getElementById('gtc').setAttribute('onclick','showCart()');
                }
            
                function showCart(){
                        his_array.push('cart');
                        document.getElementById('products-section').style.display='none';
                document.getElementById('view-section').style.display='none';
                document.getElementById('profile-section').style.display='none';
                document.getElementById('cart-section').style.display='';
                document.getElementById('register-section').style.display='none';
                    document.getElementById('login-section').style.display='none';
                document.getElementById('add-section').style.display='none';
                document.getElementById('edit-section').style.display='none';
                
                cart_items = [];
                if(!( JSON.parse(window.localStorage.getItem('cart'))===null))
                {
                cart_items = JSON.parse(window.localStorage.getItem('cart'));
                console.log("This is cart items: ",cart_items);
                }
                var cart_divs = '<h1 style="margin:30px;">Cart | ' + cart_items.length + ' Items </h1><i class="fas fa-arrow-left back" style="cursor:pointer;color: black;z-index: 100;position: fixed;top:50px;left:30px;font-size:24px;" onclick="goBack()" ></i>';
                        if(!window.localStorage.getItem('email')){
                                cart_divs +='<div class="cart_card" style="box-shadow:0px 0px 0px white;padding:15px; height:auto;width:70%;background-color:orange;font-size:16px; color:white;"><i class="fas fa-bell"></i>&emsp;Your Cart Selections are Temporary and might get lost!</div>'
                        }
                        else{
                                cart_divs +='<div class="cart_card" style="box-shadow:0px 0px 0px white;padding:15px; height:auto;width:70%;background-color:green;font-size:16px; color:white;"><i class="fas fa-bell"></i>&emsp;Your Cart Selections are synced to our servers everytime you Logout.</div>'
                        }
                if(cart_items.length==0)
                {
                        cart_divs+='<img width="30%" height="auto" src="cart_banner.png"><br><Br><p style="font-size:20px;color:gray">Its feels lonely in here!</p><br><br><div class="button" style="width:50%" onclick="showProducts()">START SHOPPING</div>';
                }
                else
                {
                        var totalCost = 0;
                        var totalMRP = 0;
                for(var i=0; i<cart_items.length;i++)
                {
                        totalCost += parseInt(cart_items[i].product_price);
                        totalMRP += parseInt(cart_items[i].product_mrp);
                        var cart_product = '<div class="cart_card"><div class="cart_img"></div><div style="cursor:pointer" onclick="deleteCart('+ i +')" class="trash_icon"><i class="fas fa-trash"></i></div><div class="cart_details"><div class="cart_name">'+ cart_items[i].product_name+'</div><div class="cart_price">&#8377;'+ cart_items[i].product_price+'</div></div></div>';
                        cart_divs+=cart_product;
                }
                cart_divs+="<div style='font-size:20px'>Total MRP: &#8377;"+ totalMRP + "&emsp;|&emsp;Snatch Price: &#8377;"+ totalCost +"</div>";
                cart_divs+='<div class="button" style="width:60% !important;" onclick="show_animation()">Total Savings: &#8377;'+ (totalMRP-totalCost) + ' (' + parseInt(((totalMRP-totalCost)/totalMRP)*100) +'%)&emsp;|&emsp;PROCEED TO CHECKOUT</div><div style="height:15vh;width:40vw;"></div>';
        }
                document.getElementById('cart-section').innerHTML=cart_divs;
                }
        
        
                
            function deleteCart(id)
            {
                cart_items.splice(id,1);
                console.log(cart_items);
                window.localStorage.setItem('cart',JSON.stringify(cart_items));
                console.log(window.localStorage);
                snatchAlert("Item has been Deleted from Cart",-1);
                showCart();
            }
        
            function snatchAlert(message, code)
            {
                    if(code==1) document.getElementById('prompt').style.backgroundColor="green";
                    if(code==-1) document.getElementById('prompt').style.backgroundColor="red";
                    if(code==0) document.getElementById('prompt').style.backgroundColor="orange";
                    document.getElementById('prompt').style.opacity=1;
                    document.getElementById('prompt').innerHTML=message;
                    setTimeout(function(){ document.getElementById('prompt').style.opacity=0; document.getElementById('prompt').style.backgroundColor="transparent";}, 3000);
            }
        
            function verifyToken()
            {
                console.log("Verify called");
                    if(window.localStorage.getItem('token'))
                    {
                        var auth = window.localStorage.getItem('token').toString();
        
                                var myHeaders = new Headers();
                                myHeaders.append('Authorization', auth);
                                myHeaders.append('Content-Type', 'application/json');
        
                        fetch('http://127.0.0.1:5000/verify',  {
                method: 'GET',
                headers: myHeaders,
            })
            .then(response => response.json())
            .then(function(data) {
                    console.log(data);
                if(data.code===200) 
                {
                        document.getElementById('sell').style.display="";
                        document.getElementById('power').style.display="";
                }
                if(data.code===-4)
                {
                           document.getElementById('sell').style.display="none";
                        document.getElementById('power').style.display="none";
                        logout(2);
                }
                if(data.code===55)
                {
                           document.getElementById('sell').style.display="none";
                        document.getElementById('power').style.display="none";
                        logout(2);
                }
            });
        }
                    else {
                           document.getElementById('sell').style.display="none";
                        document.getElementById('power').style.display="none";
                    }
            }
        
        
        
            function show_animation(){
                    showCart();
                document.getElementById('cart-section').innerHTML="<div style='height:60%;width:auto;'><img src='checkout_animation.gif' height='100%' width='auto'></div><div style='color:green;font-size:24px'>You are awesome! Thanks for snatching with us.<BR><br>Happiness on its way!</div>";
                setTimeout(function(){showProducts()},6000);
                window.localStorage.removeItem('cart');
            }
        
        
            window.localStorage.removeItem('collectedIndex');
                        window.localStorage.removeItem('minIndex');
                        getIndex();
        