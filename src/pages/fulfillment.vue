<template>
  <div class="bg-indigo-900 py-4 text-center lg:px-4">
    <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert">
      <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Fulfillment </span>
      <span class="font-semibold mr-2 text-left flex-auto">
        ({{ infoShop.acc_code }} - {{ infoShop.person }}) Order ID:{{ infoOrder.madonhang }} </span>
      <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
      </svg>
    </div>
  </div>
  <div class="container relative m-auto pt-3">
    <div class="flex space-x-2 rtl:space-x-reverse mb-2" id="div_fixed">
      <button v-if="fulfill == 11 && !miss_items" type="button"
        class="rounded bg-green-500 px-2 py-1 text-white shadow-sm transition duration-150 ease-in-out hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
        @click="TreeFilterChanged2(infoOrder)">
        <i class="mr-1 hs-tooltip-toggle ti ti-circle-check"></i>
        Cập nhật
      </button>
    </div>
    <div>
      <nav class="flex mb-4" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
          <li class="inline-flex items-center">
            <a href="#"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 9 4-4-4-4" />
              </svg>
              <a href="#"
                class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Fulfillment</a>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 9 4-4-4-4" />
              </svg>
              <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Order Flash Ship (API)
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <h2 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white">
        (
        {{ tracking_type == 1 ? 'Seller Shipping' : 'Tiktok Shipping' }}) - Order : {{ infoOrder.so_code }}
        <span v-if="fulfill == 1"
          class="bg-green-100 text-green-800  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Fulfilled</span>
        <span v-else
          class="bg-red-100 text-red-800  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Not
          yet fulfilled</span>
        <span v-if="miss_items"
          class="bg-red-100 text-red-800  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Thiếu
          items
        </span>
      </h2>
      <div class="border-4 grid grid-cols-2 gap-4 p-3">
        <div>
          <div v-if="tracking_type == 1" class="mb-4 grid  grid-cols-12">
            <label class="col-form-label col-span-12 font-semibold sm:col-span-2">Platform</label>
            <div class="sm:col-span-10 col-span-12">
              <select id="platform_gm" name="platform_gm"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option :value="Poshmark">Poshmark</option>
              </select>
            </div>
          </div>
          <div v-if="infoOrder.tracking_type == 0" class=" grid grid-cols-12 mb-4 " id="tracking_box"> <label
              class="font-semibold sm:col-span-2 col-span-12 col-form-label">Tracking
              {{ tracking_type == 1 ? 'ID' : 'Label Link' }}
            </label>
            <div class="sm:col-span-10 col-span-12">
              <input type="text" id="tracking" :value="infoOrder.tracking"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
          <div class=" grid grid-cols-12 mb-4"> <label
              class="font-semibold sm:col-span-2 col-span-12 col-form-label">Shipping Address</label>
            <div class="sm:col-span-10 col-span-12">
              <div class="formRight">
                <div><strong>FullName</strong>:
                  {{ infoOrder.first_name }}
                  {{ infoOrder.last_name }}
                </div>
                <div><strong>Address1</strong>:
                  {{ infoOrder.address_1 }}
                </div>
                <div><strong>Address2</strong>:
                  {{ infoOrder.address_2 }}
                </div>
                <div><strong>City State</strong>:
                  {{ infoOrder.city }}-
                  {{ infoOrder.state }}-
                  {{ infoOrder.postcode }}-
                  {{ infoOrder.country }}
                </div>
                <div><strong>Phone</strong>:
                  {{ infoOrder.dienthoai }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="infoOrder.ff_note || infoOrder.ff_note_link || infoOrder.ghichu">
            <div v-if="infoOrder.ff_note && infoOrder.ff_note_link" class="grid grid-cols-12 mb-4 text-red-600 ">
            </div>
            <label class="font-semibold sm:col-span-2 col-span-12 col-form-label">Fulfill Note </label>
            <div class="sm:col-span-10 col-span-12">
              <div class="formRight">
                <div><strong class="text-red-600">
                    {{ infoOrder.ff_note }}
                  </strong></div>
                <div class="mt-1 text-red-600"><strong><a :href="infoOrder.ff_note_link" target="_blank"
                      rel="noopener noreferrer">
                      {{ infoOrder.ff_note_link }}
                    </a></strong></div>
              </div>
            </div>
          </div>
          <div v-if="infoOrder.ghichu" class=" grid grid-cols-12 mb-4 text-red-600 ">
            <label class="font-semibold sm:col-span-2 col-span-12 col-form-label">Fulfill Note </label>
            <div class="sm:col-span-10 col-span-12">
              <div class="formRight">
                <div class="text-red-600"><strong>
                    {{ infoOrder.ghichu }}
                  </strong></div>
              </div>
            </div>
          </div>
        </div>
        <div style="overflow: hidden;" v-if="infoOrder.tracking_type != 1">
          <div v-if="infoOrder.tracking_check">
            <span class="font-semibold">Tracking Order: </span>
            <span
              class="bg-pink-100 text-pink-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
              {{ infoOrder.tracking_check }}
            </span>
          </div>
          <iframe v-if="checkLinkLabelTiktok" id="iframeLable" :src="infoOrder.tracking" width="100%"
            height="100%"></iframe>
        </div>
      </div>
      <h2 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white">
        Product Details
      </h2>
      <div class="border-4 p-3">
        <div class="w-full flex mt-1 mb-3 ">
          <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Shipping Method: </div>
          <div style="flex:4">
            <select id="shipping_method" name="shipping_method"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option :selected="updateMethodShip == 1" value="1">FirstClass</option>
              <option :selected="updateMethodShip == 2" value="2">Priority</option>
              <option :selected="updateMethodShip == 3" value="3">RushProduction</option>
              <option :selected="updateMethodShip == 6" value="6">Line Test 21_5</option>
            </select>
          </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  #
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Product items
                </th>
                <th scope="col" class="px-6 py-3">
                  Designs
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Preview Design
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Mockup
                </th>
                <th scope="col" class="px-6 py-3">
                  Quatity
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in infoOrder.items" :key="index" :id="'productct' + item.id"
                class="border-b border-gray-200 dark:border-gray-700">
                <td style="width:50px" class="px-6 py-4">
                  {{ index + 1 }}
                </td>
                <th style="width:500px" scope="row"
                  class="break-all px-6 py-4 font-medium text-gray-900  bg-gray-50 dark:text-white dark:bg-gray-800">
                  <div class="flex mb-2 ">
                    <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Product Name: </div>
                    <div style="flex:4">{{ item.ten }}
                      <div>
                        Meta Order: <strong class="text-red-600">
                          {{ item.meta_order }}
                        </strong>
                      </div>
                      <div>
                        Seller SKU: <strong class="text-red-600">
                          {{ item.variant_id }}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div class="flex mb-2">
                    <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Product Type: </div>
                    <div style="flex:4"> <input type="text" autocomplete="off" name="type[]" title=""
                         id="type" v-model="item.product_type_ff"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                  </div>
                  <div class="flex mb-2">
                    <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Color: </div>
                    <div style="flex:4"> <input type="text" autocomplete="off" name="color[]"  v-model="item.color_ff"
                        title="" id="color"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                  </div>
                  <div class="flex mb-2">
                    <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Size: </div>
                    <div style="flex:4"> <input type="text" autocomplete="off" name="size[]"  v-model="item.size_ff"
                        title="" id="size"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                  </div>
                  <div class="flex mb-2">
                    <div style="flex:1" class="font-semibold  items-center sm:col-span-2 col-span-12 col-form-label">
                      VariantID
                      <button :data-idP="item.id" id="search{{ item.id }}" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 search_variant"
                        @click="searchVariant(item.id)">Search</button>
                    </div>
                    <div style="flex:4">
                      <div id="resultsku" class="mb-1 overflow-scroll pb-2"></div>
                      <input type="text" autocomplete="off" name="sku[]" title="" id="sku"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value="" />
                    </div>
                  </div>
                </th>
                <td style="width:400px" class="px-6 py-4">
                  <div class="flex mb-2">
                    <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Fulfill Price:
                    </div>
                    <div style="flex:4"> <input type="text" autocomplete="off" name="fulfill_price[]" title=""
                        id="fulfill_price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value="" /></div>
                  </div>
                  <div class="flex mb-2">
                    <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Print side: </div>
                    <div style="flex:4"> <select id="print_side_gm" name="print_side_gm[]"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="1">FRONT</option>
                        <option value="2">BACK</option>
                        <option value="0">BOTH</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex mb-2">
                    <div style="flex:1" class="">Design link <span
                        class=" bg-purple-100 text-purple-800 text-xs font-medium  rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400">FRONT</span>
                    </div>
                    <!-- <div style="flex:4"> <input type="text"  autocomplete="off" name="design_link_front[]" title=""
                        id="design_link_front"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :value="item.designs ? handleDesign(item.meta_order, item.designs, item.ff.product_type, 'front') : ''" />
                    </div> -->
                    <div style="flex:4"> <input type="text"  autocomplete="off" name="design_link_front[]" v-model="item.designLinkFront" title=""
                        id="design_link_front"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         />
                    </div>
                  </div>
                  <div class="flex mb-2">
                    <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Mockup link Front:
                    </div>
                    <div style="flex:4"> <input type="text" autocomplete="off" name="mockup_link_front[]" title=""
                        id="mockup_link_front"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :value="item.photo" />
                    </div>
                  </div>
                  <!-- back -->
                  <div class="flex mb-2">
                    <div style="flex:1" class="">Design link <span
                        class="bg-purple-100  text-purple-800 text-xs font-medium  rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400">BACK</span>
                    </div>
                    <!-- <div style="flex:4"> <input type="text" autocomplete="off"  name="design_link_back[]" title=""
                        id="design_link_back"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :value="item.designs ? handleDesign(item.meta_order, item.designs, item.ff.product_type, 'back') : ''" />
                    </div> -->
                    <div style="flex:4"> <input type="text" autocomplete="off"  name="design_link_back[]" title=""
                        id="design_link_back" v-model="item.designLinkBack"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         />
                    </div>
                  </div>
                  <div class="flex mb-2">
                    <div style="flex:1" class="text-sm font-medium text-gray-900 dark:text-white">Mockup link Back:
                    </div>
                    <div style="flex:4"> <input type="text" autocomplete="off" name="mockup_link_back[]" title=""
                        id="mockup_link_back"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :value="item.photo" />
                    </div>
                  </div>
                </td>
                <td style="width:200px" class="px-6 py-4 ">
                  FRONT
                  <!-- <a :href="item.designs ? handleDesign(item.meta_order, item.designs, item.ff.product_type, 'front') : ''" target="_blank" class="flex justify-center items-center w-full h-full" :style=" handleClassColor(item.ff.color)">
                   <img :src="item.designs ? handleDesign(item.meta_order, item.designs, item.ff.product_type, 'front') : ''" alt="Enter Design URL" class="max-w-full max-h-full">
                  </a> -->
                  <a :href="item.designLinkFront" target="_blank" class="flex justify-center items-center w-full h-full" :style=" handleClassColor(item.color_ff)">
                   <img :src="item.designLinkFront" alt="Enter Design URL" class="max-w-full max-h-full">
                  </a>
                  BACK
                  <a :href="item.designLinkBack" target="_blank" class="flex justify-center items-center w-full h-full" :style=" handleClassColor(item.color_ff)">
                   <img :src="item.designLinkBack" alt="Enter Design URL" class="max-w-full max-h-full">
                  </a>
                </td>
                <td style="width:200px" class="hidden px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  <a :href="item.designs ? item.designs.link || item.designs.link_mockup_back : ''" target="_blank"
                    rel="noopener noreferrer">
                    <img class="w-32 h-32 object-cover rounded-md shadow-md"
                      :src="item.designs ? item.designs.link || item.designs.link_mockup_back : ''" alt=""></a>
                </td>
                <td style="width:200px" class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  <a :href="item.photo" target="_blank" rel="noopener noreferrer"> <img
                      class="w-32 h-32 object-cover rounded-md shadow-md" :src="item.photo" alt=""></a>
                </td>
                <td style="width:50px" class="px-6 py-4 text-xl font-extrabold">
                  {{ item.soluong }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- loading -->
      <div v-if="loading" class=" text-center absolute inset-2/4">
        <div role="status">
          <svg aria-hidden="true" class="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <!-- end loading -->
      <div class="mt-5 flex space-x-2 rtl:space-x-reverse mb-5" id="div_fixed">
        <button v-if="fulfill == 11 && !miss_items" type="button"
          class="rounded bg-green-500 px-2 py-1 text-white shadow-sm transition duration-150 ease-in-out hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
          @click="TreeFilterChanged2(infoOrder)">
          <i class="mr-1 hs-tooltip-toggle ti ti-circle-check"></i>
          Cập nhật
        </button>
      </div>
    </div>
    <div>
    </div>
    <div class="absolute top-3 w-full left-1/2" id="toastElement"></div>
  </div>
</template>
<script>
import 'moment-timezone';
// eslint-disable-next-line no-unused-vars
export default {
  data() {
    // Lấy URL hiện tại
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return {
      com: this.$route.query.com,
      act: this.$route.query.act,
      type: this.$route.query.type,
      id: this.$route.query.id,
      tracking_type: this.$route.query.tracking_type,
      id_fulfil_type: this.$route.query.id_fulfil_type,
      checkLinkLabelTiktok: true,
      infoOrder: [],
      infoShop: {},
      fulfill: 11,
      miss_items: false,
      loading: false,
      orderCodeFF: '',
      acc_token_fs: '',
      jsonCheck: [],
      updateMethodShip: 1,
      idFulfilType: params.get('id_fulfil_type'),
      role: params.get('role'),
      iframeId: 'iframeLable',
      domainApi: 'https://hq6.vuongandong.com/danang/',
    };
  },
  created() {
    // Call a method to fetch user data when the component is created
    this.fetchOrder();
  },
  mounted() {
    // Scroll xuống cuối trang của iframe khi component được render vào DOM
    // this.showToast('danger', 'abc');
    // this.closeToast(3000);
  },
  methods: {
    closeToast(time) {
      setTimeout(() => {
        document.getElementById('toastElement').innerHTML = '';
      }, time);
    },
    showToast(status, content) {
      // eslint-disable-next-line no-unused-vars, no-underscore-dangle
      const classT_ = status === 'success' ? 'green' : 'red';
      // eslint-disable-next-line no-unused-vars, camelcase
      const svg_danger = `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>`;
      // eslint-disable-next-line camelcase, no-unused-vars
      const svg_success = `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>`;
      // eslint-disable-next-line no-unused-vars, camelcase
      const svg = status === 'success' ? svg_success : svg_danger;
      // eslint-disable-next-line no-unused-vars
      const html = `
      <div  id='toast-${status}'
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert">
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${classT_}-500 bg-${classT_}-100 rounded-lg dark:bg-${classT_}-800 dark:text-${classT_}-200">
          ${svg}
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">${content}</div>
        <button type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-${status}" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
     `;
      document.getElementById('toastElement').innerHTML = html;
    },
    getDataToAjax(tables, fields, wheres, where = false) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        axios.get(`${this.domainApi}ajax/ajax_load.php`, {
          params: {
            table: tables,
            where: wheres,
            field: fields,
            isWhere: where,
            act: 'loadDataToAjax',
          },
          headers: {
            Authorization: `Bearer ${this.id}`,
          },
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getSearchvariantStockAjax(ten) {
      const data2 = await this.getDataToAjax('slider', 'ten,id', `type='stock_status_ff' and  ten like '${ten}%' and hienthi=1 `, true);
      return data2;
    },
    async getStateUS(state) {
      const data2 = await this.getDataToAjax('country', '*', `state= '${state}'`, true);
      return data2;
    },
    // eslint-disable-next-line camelcase
    async getSearchvariantAjax(id_stock, type, color, size) {
      let stock = '(';
      // eslint-disable-next-line camelcase
      id_stock.forEach((val, key) => {
        if (key > 0) {
          stock += ' or ';
        }
        stock += ` id_stock='${val}' `;
      });
      stock += ')';
      // eslint-disable-next-line max-len
      const data2 = await this.getDataToAjax('fulfil_stock', '*', `${stock}  and color='${color}' and  size='${size}' and  product_name = '${type}'  order by id desc `, true);
      return data2;
    },
    // eslint-disable-next-line camelcase
    async loginFlashShip(username_fs, password_fs) {
      return new Promise((resolve, reject) => {
        fetch('https://seller.flashship.net/seller-api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // eslint-disable-next-line camelcase
            username: username_fs,
            // eslint-disable-next-line camelcase
            password: password_fs,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            resolve(data.data.access_token);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async addOrderFS(rawData, token) {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: 'POST',
          body: rawData,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          redirect: 'follow',
        };

        fetch('https://seller.flashship.net/seller-api/orders/shirt-add', requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    isObject(value) {
      return value !== null && (typeof value === 'object' || Array.isArray(value));
    },
    async searchVariant(idP) {
      const type = document.querySelector(`#productct${idP} #type`).value.trim();
      const color = document.querySelector(`#productct${idP} #color`).value.trim();
      const size = document.querySelector(`#productct${idP} #size`).value.trim();
      // eslint-disable-next-line camelcase
      this.loading = true;
      // eslint-disable-next-line camelcase
      const str_type_ship = 'Flash Ship';
      console.log(str_type_ship);
      const stocks = await this.getSearchvariantStockAjax(str_type_ship);
      console.log(stocks);
      if (!this.isObject(stocks)) {
        document.querySelector(`#productct${idP} #sku`).value = '';
        this.loading = true;
        this.loading = false;
        this.showToast('danger', 'Variant not identified');
        this.closeToast(3000);
        const htmlS = ' <span class="cursor-pointer resultsku_items bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">No Result</span>';
        document.querySelector(`#productct${idP} #resultsku`).innerHTML = htmlS;
      } else {
        // eslint-disable-next-line camelcase
        const id_stock = stocks.map((val) => val.id);
        console.log(id_stock);
        // eslint-disable-next-line no-undef
        document.querySelector(`#productct${idP} #sku`).value = '';
        const variantStocks = await this.getSearchvariantAjax(id_stock, type, color, size);
        console.log(variantStocks);
        let htmlS = '';
        if (this.isObject(variantStocks)) {
          // const variantStocksParse = JSON.parse(variantStocks);
          const variantStocksParse = variantStocks;
          const tagsSku = variantStocksParse.map((val) => `<span data-id="${val.sku_id}" class="cursor-pointer resultsku_items bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${val.sku_id}</span>`);
          htmlS = tagsSku.join(' ');
          this.showToast('success', `${variantStocksParse.length} variants were found`);
          this.closeToast(3000);
          document.querySelector(`#productct${idP} #sku`).value = (variantStocksParse[0].sku_id);
        }
        this.loading = false;
        if (!this.isObject(variantStocks)) {
          this.showToast('danger', 'Variant not identified');
          this.closeToast(3000);
          htmlS = ' <span class="cursor-pointer resultsku_items bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">No Result</span>';
        }
        document.querySelector(`#productct${idP} #resultsku`).innerHTML = htmlS;
        //
        // document.querySelector('.resultsku_items').click(function () {
        //   // eslint-disable-next-line camelcase, no-undef
        //   const data_i = $(this).data('id');
        //   document.getElementById(`productct${idP} #sku`).val(data_i);
        //   // eslint-disable-next-line camelcase
        //   this.showToast('success', `Selected  variant ID: ${data_i}`);
        //   this.closeToast(3000);
        // });
      }
    },
    async TreeFilterChanged2(infoOrder) {
      this.loading = true;
      // eslint-disable-next-line camelcase, prefer-destructuring
      const tracking_type = infoOrder.tracking_type;
      // eslint-disable-next-line prefer-destructuring
      // const madonhang = infoOrder.madonhang;
      const dataOrd = infoOrder.items;
      console.log(dataOrd);
      const products2 = [];
      dataOrd.forEach((value) => {
        products2.push({
          variant_id: document.querySelector(`#productct${value.id} #sku`).value,
          printer_design_front_url: document.querySelector(`#productct${value.id} #design_link_front`).value,
          printer_design_back_url: document.querySelector(`#productct${value.id} #design_link_back`).value,
          mockup_front_url: document.querySelector(`#productct${value.id} #mockup_link_front`).value,
          mockup_back_url: document.querySelector(`#productct${value.id} #mockup_link_back`).value,
          quantity: value.soluong,
          note: '',
        });
      });
      // eslint-disable-next-line camelcase
      const state_query = await this.getStateUS(infoOrder.state);
      // eslint-disable-next-line camelcase
      const datas = {};
      datas.items = products2;
      datas.id_fulfil_type_url = this.idFulfilType;
      // eslint-disable-next-line no-underscore-dangle
      datas.id_ = infoOrder.id;
      datas.country = 'US';
      const raw = {
        order_id: infoOrder.so_code,
        buyer_first_name: infoOrder.first_name,
        buyer_last_name: infoOrder.last_name,
        buyer_email: '',
        buyer_phone: infoOrder.dienthoai,
        buyer_address1: infoOrder.address_1,
        buyer_address2: infoOrder.address_2,
        buyer_city: infoOrder.city,
        // eslint-disable-next-line camelcase
        buyer_province_code: state_query[0].state_code ?? '',
        buyer_zip: infoOrder.postcode,
        buyer_country_code: 'US',
        shipment: document.getElementById('shipping_method').value,
        products: products2,
      };
      // eslint-disable-next-line camelcase, eqeqeq
      if (tracking_type == 0) {
        raw.linkLabel = document.getElementById('tracking').value;
      }
      // eslint-disable-next-line camelcase
      const acc_token = await this.loginFlashShip(infoOrder.username_fs, infoOrder.password_fs);
      // eslint-disable-next-line camelcase
      this.acc_token_fs = acc_token;
      // eslint-disable-next-line camelcase
      if (acc_token) {
        // add order
        const addorder = await this.addOrderFS(JSON.stringify(raw), acc_token);
        const addorderparse = JSON.parse(addorder);
        //
        this.loading = false;
        // eslint-disable-next-line eqeqeq
        if (addorderparse.msg == 'success') {
          this.showToast('success', 'Add order successfully');
          this.closeToast(3000);
          this.fulfill = 1;
          this.orderCodeFF = addorderparse.data;
          // eslint-disable-next-line camelcase
          // eslint-disable-next-line camelcase, eqeqeq
          const datas2 = {};
          // eslint-disable-next-line no-underscore-dangle
          datas2.id_ = infoOrder.id;
          datas2.price = '';
          datas2.id_fulfil_type_url = this.idFulfilType;
          datas2.act = 'update_order_code_fs';
          datas2.order_code = addorderparse.data;
          datas2.role = this.role;
          // eslint-disable-next-line no-undef
          axios.get(`${this.domainApi}ajax/xuly_admin_dn.php`, {
            params: datas2,
            headers: {
              // eslint-disable-next-line template-curly-spacing, no-undef
              Authorization: `Bearer ${infoOrder.id}`,
            },
          })
            .then((response) => {
              console.log(response.data);
              this.showToast('success', 'Update Order Code  Fulfill successfully');
              this.closeToast(4000);
              // eslint-disable-next-line no-param-reassign
              infoOrder.order_code = addorderparse.data;
              this.handleGetOrderApi(infoOrder);
            })
            .catch((error) => {
              console.error('There was an error!', error);
            });
        } else {
          this.showToast('danger', addorderparse.err);
          this.closeToast(3000);
        }
        console.log(addorder);
      }
    },
    async handleGetOrderApi(infoOrder) {
      // eslint-disable-next-line no-unused-vars
      const fulfill = infoOrder.fulfil;
      // eslint-disable-next-line camelcase
      const ff_price = infoOrder.fulfill_price;
      const orderCodeFs = infoOrder.order_code;
      // eslint-disable-next-line camelcase
      // eslint-disable-next-line eqeqeq
      console.log(fulfill);
      console.log(orderCodeFs);
      // eslint-disable-next-line eqeqeq
      // eslint-disable-next-line camelcase, no-unused-vars
      // eslint-disable-next-line camelcase
      // orderCodeFs
      // eslint-disable-next-line no-use-before-define
      if (!this.acc_token_fs) {
        // eslint-disable-next-line camelcase
        const acc_token = await this.loginFlashShip(infoOrder.username_fs, infoOrder.password_fs);
        // eslint-disable-next-line camelcase
        this.acc_token_fs = acc_token;
      }
      if (this.acc_token_fs) {
        const orderDetailFs = await this.orderDetailFs(orderCodeFs, this.acc_token_fs);
        const orderDetailFsParse = JSON.parse(orderDetailFs);
        console.log(orderDetailFsParse);
        infoOrder.items.forEach((value, k) => {
          // eslint-disable-next-line no-unused-expressions, no-sequences
          document.querySelector(`#productct${value.id} #sku`).value = (orderDetailFsParse.products[k].variantId),
          document.querySelector(`#productct${value.id} #fulfill_price`).value = (`${orderDetailFsParse.totalFee} (priceALL)`),
          document.querySelector(`#productct${value.id} #design_link_front`).value = (orderDetailFsParse.products[k].frontPrintUrl);
          document.querySelector(`#productct${value.id} #design_link_back`).value = (orderDetailFsParse.products[k].backPrintUrl);
        });
        this.updateMethodShip = orderDetailFsParse.shipmentMethod;
        // update price
        // eslint-disable-next-line camelcase, eqeqeq
        if (ff_price == '' || ff_price == 0) {
          const datas2 = {};
          // eslint-disable-next-line no-underscore-dangle
          datas2.id_ = infoOrder.id;
          datas2.act = 'update_order_code_fs_not_ngayin';
          datas2.method_fs = orderDetailFsParse.shipmentMethod;
          datas2.price = orderDetailFsParse.totalFee;
          // eslint-disable-next-line no-undef
          axios.get(`${this.domainApi}ajax/xuly_admin_dn.php`, {
            params: datas2,
            headers: {
              // eslint-disable-next-line template-curly-spacing, no-undef
              Authorization: `Bearer ${infoOrder.id}`,
            },
          })
            .then((response) => {
              // eslint-disable-next-line no-console
              console.log(response.data);
              this.showToast('success', 'Update Price Fulfill successfully');
            })
            .catch((error) => {
              console.error('There was an error!', error);
            });
        }
      }
    },
    fetchOrder() {
      // eslint-disable-next-line no-undef
      axios
        .get(
          `https://hq6.vuongandong.com/danang/api/fulfillment.php?act=getOrder&id=${this.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.id}`,
            },
          },
        )
        .then((response) => {
          console.log(response);
          this.infoOrder = response.data.order;
          this.infoShop = response.data.order.shop;
          this.fulfill = response.data.order.fulfil;
          this.jsonCheck = JSON.parse(response.data.order.json);
          if (response.data.order.miss_items === true) {
            this.miss_items = true;
          }
          // this.checkLinkLabelTiktok = response.data.order.tracking.includes('seller');
          // eslint-disable-next-line eqeqeq
          if (response.data.order.fulfil == 1 && response.data.order.order_code !== '') {
            this.handleGetOrderApi(response.data.order);
          }
          this.updateDesignLinks(); // Cập nhật các link thiết kế khi component được mount
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async handleDesign2(metaOrder, designs, productType, side) {
      const arrayDarkShirt = ['Sand', 'White', 'Ash', 'Sport Grey', 'Spot Grey', 'Light Blue', 'Light Pink'];
      const arrayLightShirt = ['Black', 'Orange', 'Forest Green', 'Navy', 'Maroon', 'Royal Blue', 'Dark Heather', 'Military Green'];
      // eslint-disable-next-line no-unused-vars
      const [color, size] = metaOrder.split(',');

      if (arrayLightShirt.includes(color)) {
        if (productType === 'SHIRT' || productType === 'SWEATSHIRT') {
          if (side === 'front') {
            return designs.design_fd || ''; // Return design_fd if available, otherwise an empty string
          }
          return designs.design_bd || ''; // Return design_bd if available, otherwise an empty string
        } if (productType === 'HOODIE') {
          return designs.design_fd_fs || ''; // Return design_fd_fs if available, otherwise an empty string
        }
      } else if (arrayDarkShirt.includes(color)) {
        if (productType === 'SHIRT' || productType === 'SWEATSHIRT') {
          if (side === 'front') {
            return designs.design_fl || ''; // Return design_fl if available, otherwise an empty string
          }
          return designs.design_bl || ''; // Return design_bl if available, otherwise an empty string
        } if (productType === 'HOODIE') {
          return designs.design_fl_fs || ''; // Return design_fl_fs if available, otherwise an empty string
        }
      }
      // Return an empty string as default if none of the conditions match
      return '';
    },
    // eslint-disable-next-line consistent-return
    handleDesign(metaOrder, designs, productType, side) {
      const arrayDarkShirt = ['Sand', 'White', 'Ash', 'Sport Grey', 'Sport Grey', 'Light Blue', 'Light Pink'];
      const arrayLightShirt = ['Black', 'Forest Green', 'Navy', 'Maroon', 'Royal Blue', 'Military Green'];
      const [color] = metaOrder.split(',');
      if (designs) {
        if (arrayLightShirt.includes(color)) {
          if (productType === 'SHIRT' || productType === 'SWEATSHIRT') {
            if (side === 'front') {
              // design đen
              return designs.design_fd;
            }
            return designs.design_bd;
          } if (productType === 'HOODIE') {
            if (side === 'front') {
              // design đen
              return designs.design_fd_fs;
            }
            return designs.design_bd;
          }
        } else if (arrayDarkShirt.includes(color)) {
          if (productType === 'SHIRT' || productType === 'SWEATSHIRT') {
            if (side === 'front') {
              // design đen
              return designs.design_fl;
            }
            return designs.design_bl;
          } if (productType === 'HOODIE') {
            if (side === 'front') {
              // design đen
              return designs.design_fl_fs;
            }
            return designs.design_bl;
          }
        } else {
          return '';
        }
      } else {
        return '';
      }
    },
    handleClassColor(color) {
      if (color === 'Sand') {
        return 'background-color:rgb(220, 210, 190);';
      }
      if (color === 'White') {
        return 'background-color:rgb(255, 255, 255)';
      }
      if (color === 'Ash') {
        return 'background-color:rgb(246, 246, 246)';
      }
      if (color === 'Ash Grey') {
        return 'background-color:rgb(246, 246, 246)';
      }
      if (color === 'Sport Grey') {
        return 'background-color:rgb(202, 202, 202);';
      }
      if (color === 'Spot Grey') {
        return 'background-color:rgb(202, 202, 202);';
      }
      if (color === 'Light Blue') {
        return 'background-color:rgb(214, 230, 247);';
      }
      if (color === 'Light Pink') {
        return 'background-color:rgb(254, 224, 235);';
      }
      if (color === 'Black') {
        return 'background-color:black';
      }
      if (color === 'Forest Green') {
        return 'background-color:rgb(34, 59, 38);';
      }
      if (color === 'Navy') {
        return 'background-color:rgb(26, 34, 55);';
      }
      if (color === 'Maroon') {
        return 'background-color:rgb(100, 40, 56);';
      }
      if (color === 'Royal Blue') {
        return 'background-color:rgb(8, 79, 151);';
      }
      if (color === 'Dark Heather') {
        return 'background-color:rgb(69, 69, 69);';
      }
      if (color === 'Military Green') {
        return 'background-color:rgb(98, 102, 76);';
      }
      if (color === 'Orange') {
        return 'background-color:rgb(234, 95, 34);';
      }
      return '';
    },
    async orderDetailFs(orderId, token) {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          redirect: 'follow',
        };

        const response = await fetch(`https://seller.flashship.net/seller-api/orders/${orderId}`, requestOptions);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.text();
        return result;
      } catch (error) {
        console.error('Error fetching order details:', error);
        throw error; // Re-throw the error to be caught by the caller
      }
    },
    updateDesignLinks() {
      this.infoOrder.items.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.designLinkFront = this.handleDesign(item.meta_order, item.designs, item.ff.product_type, 'front');
        // eslint-disable-next-line no-param-reassign
        item.designLinkBack = this.handleDesign(item.meta_order, item.designs, item.ff.product_type, 'back');
      });
    },
  },
};
</script>
