(function () {
    'use strict';
    var config = {
        isDebug: true,


        api: {
            //core
            prefix: '/api/v1/',

            //retailer
            getRetailerInfo: 'retailer/GetRetailerInfo',
            updateRetailerBrandDetail: 'retailer/UpdateRetailerBrandDetail',
            updateRetailerContactDetail: 'retailer/UpdateRetailerContactDetail',
            uploadStoreImage: 'retailer/UploadRetailerImage',
            updateRetailerStoreDetail: 'retailer/UpdateRetailerStoreAppearanceDetail',
            updateRetailerPaymentDetail: 'retailer/UpdateRetailerPaymentDetail',
            getAllCountries: 'retailer/GetAllCountries',
            getAllCurrencies: 'retailer/GetAllCurrencies',
            getAllPayoutMethods: 'retailer/GetAllPayoutMethods',
            getRetailerStore: 'Retailer/GetRetailerStore',
            updateRetailerStoreLocation: 'Retailer/UpdateRetailerStoreLocation',
            getRetailerStoreDetail: 'Retailer/GetRetailerStoreDetail',
            getAllStatiesByCountryID: 'Retailer/GetStateByCountry',
            getAnalyticsOfRetailer: 'Retailer/getAnalyticsOfRetailer',
            getRetailerListEventNotification: 'retailer/GetRetailerListEventNotification',
            checkRetailerStoreIsExisted: 'Retailer/CheckRetailerStoreIsExisted',

            //location
            importLocation: 'Retailer/Locations',
            getImportLocationStatus: 'GetApiStatus/',

            //user
            login: 'retailer/Signin',
            register: 'retailer/Register',
            forgotPassword: 'retailer/ForgotPassword',


            //product
            importProduct: 'Product/Import',
            getImportProductStatus: 'GetApiStatus/',

            //report
            getReportByDate: 'Report/GetMerchantReportArea',
            getReportByLocation: 'Report/GetMerchantReportGeo',

            //order
            getOrdersNotification: 'Retailer/GetOrdersNotification',
            getOrders: 'retailer/GetListOrders',
            getOrderByID: 'retailer/GetOrderDetail'
        },

        title: {
            home: 'BuyDesire | Merchant Dashboard',
            dashBoard: 'Dashboard',
            location: 'Locations',
            product: 'Products',
            login: 'Login',
            register: 'Register',
            forgot_password: 'Forgot Password',
            tos: 'Terms & Policies',
            _404: '404 - File Not Found',
            _403: 'Access Denied',
            error: 'Something went wrong',
            help: 'Help'
        },

        route: {
            viewPathTemplate: '/app/feature/{controller}/views/{action}.html',
            defaultPath: '/app/feature/home/views/home.html',
            _404: '/content/404',
            login: '/user/login',
            register: '/user/register'
        },

        validate: {
            home: {
                RetailerID_require: 'Retailer is require',
                StorefrontDomain_require: 'Showroom Domain is require',
                StorefrontDomain_minLength: 'Showroom Domain must be at least 6 characters long',
                StorefrontDomain_invalid: 'Showroom Domain is invalid',
                StorefrontDomain_isExisted: 'Showroom Domain is existed',
                Tagline_require: 'Tagline is require',
                Tagline_maxLength: 'Tagline must not exceed 256 characters',
                Description_require: 'Description is require',
                Description_maxLength: 'Description must not exceed 512 characters',
                EmailAddress_require: 'Email address is require',
                EmailAddress_invalid: 'Email address is invalid',
                WebsiteURL_require: 'Website is require',
                WebsiteURL_invalid: 'Website is invalid',
                PhoneNumber_require: 'Telephone is require',
                PhoneNumber_invalid: 'Telephone is invalid',
                Address1_require: 'Please enter your first address',
                Address2_require: '',
                City_require: 'Please enter your city',
                StateName_require: 'Please enter your state',
                PostCode_require: 'Please enter your postal code',
                CountryID_require: 'Please choose your country',
                PreferredStoreThemeID_require: '',
                PreferredPaymentMethodID_require: '',
                PayPalEmailAddress_require: ''
            },
            login: {
                UserName_require: 'Please enter your Username',
                Password_require: 'Please enter your password'
            },
            register: {
                UserName_require: 'Please enter your Username',
                UserName_invalid: 'Username is invalid',
                UserName_minLength: 'Your Username must be at least 6 characters long',
                Email_require: 'Please enter your email address',
                Email_invalid: 'Your email is not valid',
                Password_require: 'Please enter your password',
                Password_minLength: 'Your password must be at least 6 characters long',
                ConfirmPassword_require: 'Please confirm your password',
                ConfirmPassword_notMatch: 'Password does not match',
                StoreName_isExisted: 'Store name is existed',
                StoreName_require: 'Please enter your store name',
                StoreName_minLength: 'Your store name must be at least 6 characters long',
                FullName_require: 'Please enter your full name',
                City_require: 'Please enter your city',
                PostCode_require: 'Please enter your postal code'
            },
            forgot_password: {
                UserName_require: 'Please enter your Username',
                UserName_invalid: 'Username is invalid',
                Email_require: 'Please enter your password',
                Email_invalid: 'Your email is invalid'
            },
            image: {
                Error_Upload_Image_Server: 'Upload Failure',
                Error_Upload_Image_Invalid: 'File is invalid'
            },
            location: {
                StoreCode_require: 'Please enter your store code',
                StoreCode_isExisted: 'StoreCode is existed',
                StoreCode_maxLength: 'StoreCode must not exceed 256 characters',
                StoreName_require: 'Please enter your store name',
                StoreName_isExisted: 'StoreName is existed',
                StoreName_maxLength: 'Description must not exceed 256 characters',
                AddressLine1_require: 'Please enter your first address',
                AddressLine1_maxLength: 'AddressLine1 must not exceed 500 characters',
                AddressLine2_require: 'Please enter your second address',
                AddressLine2_maxLength: 'AddressLine2 must not exceed 500 characters',
                StateName_require: 'Please enter your state',
                City_require: 'Please enter your City',
                City_maxLength: 'Max of City is 50 characters long',
                PostCode_require: 'Please enter your post code',
                PostCode_maxLength: 'Max of post code is 50 characters long',
                PostCode_number: 'Format of post code is number',
                PhoneNumber1_require: 'Please enter your first phone number',
                PhoneNumber2_require: 'Please enter your second phone number',
                PhoneNumber_number: 'Format of phone number is number',
                PhoneNumber_minLength: 'Phone number must be at least 10 characters long',
                PhoneNumber_maxLength: 'Max of phone number is 50 characters long',
                OpeningHours_require: 'Please enter your openning hours',
                OpeningHoursMaxLength: 'Opening Hours must not exceed 512 characters',
                DescriptionMaxLength: 'Description must not exceed 1000 characters',
                Latitude_Longitude_require: 'Please enter your Latitude & Longitude',
                EmailAddress_require: 'Please enter your EmailAddress',
                EmailAddress_invalid: 'Email address invalid',
                EmailAddress_maxLength: ' EmailAddress must not exceed 156 characters',
                WebsiteURL_invalid: 'Website is invalid',
                StateID_require: 'State is required',
                Latitude_Longitude_number: 'Please enter a number'
            }
        },

        image: {
            LogoImageUrl: '/assets/images/no-logo.jpg',
            CoverImageUrl: '/assets/images/no-cover.jpg',
            MapMarker: '/assets/images/map-marker.png'
        },
        timer: {
            pullrequest: 1000
        },

        url: {
            locationCSVTemplate: 'https://docs.google.com/spreadsheet/ccc?key=0AtAMaLBhiYxedHRucWhlVUxNZ0QwOUJJSDFwbDRkd2c#gid=0'
        },

        page: {
            StartPage: 0,
            PageSize: 12
        }
    };

    angular
        .module('app')
        .run(['$injector', '_', function ($injector, _) {
            var configEnv = $injector.has('configEnv') ? $injector.get('configEnv') : null;
            _.extend(config.api, configEnv.api);
        }])
        .constant('config', config);//value || constant
})();