import requests from "./httpService";

const UserServices = {
  loginUser(body) {
    return requests.post(`/login`, body);
  },
  addLastPeriodDate(body) {
    return requests.post("/addLastPeriodDate", body);
  },
  GetAllMenstruationDetailsbyUniqueKey(currentDate, name) {
    return requests.get(`/menstrualRoutes/daysLeft/${currentDate}/${name}`);
  },
  CreateMenstrualRoutes(body) {
    return requests.post(`/menstrualRoutes/create/`, body);
  },
  nextCycle(name) {
    return requests.post(`/menstrualRoutes/nextCycle/${name}`);
  },
  PeriodDateChecker(body) {
    return requests.post(`/periodDateChecker`, body);
  },
  getSymptoms() {
    return requests.get(`/getAllSymptoms`);
  },
  MarkSymptoms(customerId, body) {
    // console.log("hi");
    return requests.post(`/mark_symptom/${customerId}`, body);
  },
  ShowSymptom(customerId, body) {
    return requests.post(`/show_symptom/${customerId}`, body);
  },
  GetCycleHistory(customerId) {
    return requests.get(`/get_cycle_history/${customerId}`);
  },
  GetCycleHistoryLastThree(customerId) {
    return requests.get(`/get_cycle_history_last/${customerId}`);
  },
  getAllCategories() {
    return requests.get(`/category`);
  },
  getAllProductsCategories() {
    return requests.get(`/products/category`);
  },
  GetFavBlogUser(customerId) {
    return requests.get(`/get_fav${customerId}`);
  },
  AddToFav(customerId, body) {
    return requests.post(`/add_to_fav${customerId}`, body);
  },
  PostOfCategory(name) {
    return requests.get(`/post_of_category/${name}`);
  },
  PostById(id) {
    return requests.get(`/post_by_id/${id}`);
  },
  getAllPosts({ page, limit, category, title }) {
    const searchCategory = category !== null ? category : "";
    const searchTitle = title !== null ? title : "";

    return requests.get(
      `/all_posts_new?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}`
    );
  },
  getAllProducts({ page, limit, category }) {
    const searchCategory = category !== null ? category : "";

    return requests.get(
      `/all_products?page=${page}&limit=${limit}&category=${searchCategory}`
    );
  },
  getUserNotification(customerId) {
    return requests.get(`/getNotification/${customerId}`);
  },
  CreateNotification(body) {
    return requests.post(`/createNotification`, body);
  },
  PlaceOrder(body) {
    return requests.post(`/place_order`, body);
  },
  CreateSubscription(body) {
    return requests.post(`/create_subscription`, body);
  },
  CouponCheck(body) {
    return requests.post(`/couponCheck`, body);
  },
  ChangeCustomerStatus(customerId) {
    return requests.get(`/change_customer_status/${customerId}`);
  },
  symptonsDates(customerId) {
    return requests.get(`/symptonsDates/${customerId}`);
  },
  getAddress(customerId) {
    return requests.get(`/getAddress/${customerId}`);
  },
  addAddress(body) {
    return requests.post(`/addAddress/`, body);
  },
  changeAddressStatus(body) {
    return requests.post(`/changeAddressStatus/`, body);
  },
  getDefaultAddress(customerId) {
    return requests.get(`/getDefaultAddress/${customerId}`);
  },
  getActiveCities() {
    return requests.get(`/getActiveCities`);
  },
  getAddressById(id) {
    return requests.get(`/getAddressById/${id}`);
  },
  updateAddressById(id, body) {
    return requests.put(`/updateAddressById/${id}`, body);
  },
  addPreviousCycle(body) {
    return requests.post(`/addPreviousCycle`, body);
  },
  getAllUserOrder(id) {
    return requests.get(`/getAllUserOrder/${id}`);
  },
  getOrderById(id) {
    return requests.get(`/getOrderById/${id}`);
  },
  getUserById(id) {
    return requests.get(`/getUserById/${id}`);
  },
  checkSubscrtiption(id) {
    return requests.get(`/checkSubscrtiption/${id}`);
  },
  getSubscrtiption(id) {
    return requests.get(`/getSubscrtiption/${id}`);
  },
  editSubscription(id, body) {
    return requests.put(`/editSubscription/${id}`, body);
  },
  couponAddtoCustomers(body) {
    return requests.post(`/couponAddtoCustomers`, body);
  },
  changeSubscriptionStatus(id) {
    return requests.get(`/subscription/status/${id}`);
  },

  getUserName(id) {
    return requests.get(`/customer/${id}`);
  },

  getActivePromotions() {
    return requests.get(`/getActivePromotions`);
  },

  updateProfile(id, body) {
    return requests.put(`/editProfile/${id}`, body);
  },

  submitReview(body) {
    return requests.post(`/submitReview`, body);
  },

  getAllReviesofProduct(id) {
    return requests.get(`/getAllReviesofProduct/${id}`);
  },
  trackActivity(body) {
    return requests.post(`/track-activity`, body);
  },
  editPreviousPeriodDate(body) {
    return requests.post(`/menstrualRoutes/createPreviousCycle`, body);
  },
};

export default UserServices;
