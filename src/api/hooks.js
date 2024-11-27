import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { decrypt } from 'utils/decrypt';
import agent1 from './agent1';
import agent2 from './agent2';

/**
 *
 * Services API Hooks
 * ===================
 */
export const useServices = () =>
  useQuery({
    queryKey: ['services'],
    queryFn: () => agent1.Services.GetServices(),
    refetchOnWindowFocus: false,
  });

/**
 *
 * Cycles API Hooks
 * ===================
 */

export const useAddProduct = () =>
  useMutation({
    mutationKey: ['add-product'],
    mutationFn: (payload) => agent2.Admin.AddProduct(payload),
    onSuccess: (data) => data,
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ msg: message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'top-right' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

export const useCycles = (queryParams = {}) =>
  useQuery({
    queryKey: ['cycles', `${JSON.stringify(queryParams)}`],
    queryFn: () => agent1.Cycles.GetCycles(queryParams),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

export const useCycle = (productId = '') =>
  useQuery({
    queryKey: [`cycle-${productId}`],
    queryFn: () => agent1.Cycles.GetCycleById(productId),
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

export const useUpdateCycle = (productId = '') =>
  useMutation({
    mutationKey: [`cycle-${productId}`],
    mutationFn: (payload) => agent2.Admin.UpdateCycle(productId, payload),
    onSuccess: (data) => data,
  });

export const useDeleteCycle = (productId = '') =>
  useMutation({
    mutationKey: [`cycle-${productId}`],
    mutationFn: (productId = '') => agent2.Admin.DeleteCycle(productId),
    onSuccess: (data) => data,
  });

export const useDeleteBulkCycles = () =>
  useMutation({
    mutationKey: ['delete-bulk-cycles'],
    mutationFn: (payload) => agent2.Admin.DeleteBulkCycles(payload),
    onSuccess: (data) => data,
  });

export const useDeleteUser = (userId = '') =>
  useMutation({
    mutationKey: [`user-${userId}`],
    mutationFn: (userId = '') => agent2.Admin.DeleteUser(userId),
    onSuccess: (data) => data,
  });

export const useDeleteBulkUser = () =>
  useMutation({
    mutationKey: ['delete-bulk-users'],
    mutationFn: (payload) => agent2.Admin.DeleteBulkUser(payload),
    onSuccess: (data) => data,
  });

/**
 *
 * Reviews API Hooks
 * ===================
 */
export const useReviews = (productId = '') =>
  useQuery({
    queryKey: [`reviews-${productId}`],
    queryFn: () => agent2.Reviews.GetReviews(productId),
    refetchOnWindowFocus: true,
  });

export const useGetPendingReviews = () =>
  useQuery({
    queryKey: ['pending-reviews'],
    queryFn: () => agent2.Reviews.GetPendingReviews(),
    select: (data) => data.data,
    refetchOnWindowFocus: true,
  });

export const useGetOwnReviews = (queryParams = null) =>
  useQuery({
    queryKey: ['reviews' + JSON.stringify(queryParams)],
    queryFn: () => agent2.User.GetOwnReviews(queryParams),
    refetchOnWindowFocus: false,
    select: (response) => {
      const { data, meta } = response.data;

      return {
        data,
        meta,
      };
    },
  });

export const useCreateReview = (productId = '') =>
  useMutation({
    mutationKey: ['create-review' + productId],
    mutationFn: (payload) => agent2.User.CreateReview(productId, payload),
    onSuccess: (data) => data.data,
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'bottom-center' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

export const useDeleteReview = (reviewId = '') =>
  useMutation({
    mutationKey: ['delete-review' + reviewId],
    mutationFn: () => agent2.User.DeleteReview(reviewId),
    onSuccess: (data) => data.data,
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'bottom-center' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

/**
 *
 * Payment API Hooks
 * ===================
 */
export const usePaymentIntent = () =>
  useMutation({
    mutationKey: ['create-payment-intent'],
    mutationFn: (payload) => agent2.Payment.CreateIntent(payload),
    onSuccess: (data) => data,
  });

/**
 *
 * Orders API Hooks
 * ===================
 */
export const useCreateOrder = () =>
  useMutation({
    mutationKey: ['create-order'],
    mutationFn: (payload) => agent2.User.CreateOrder(payload),
    onSuccess: (data) => data,
  });

export const useGetUserOrders = (queryParams = null) =>
  useQuery({
    queryKey: ['orders' + JSON.stringify(queryParams)],
    queryFn: () => agent2.User.GetOrders(queryParams),
    refetchOnWindowFocus: false,
    select: (response) => {
      const { data, meta } = response.data;

      return {
        data,
        meta,
      };
    },
  });

export const useDeleteBulkOrder = () =>
  useMutation({
    mutationKey: ['delete-bulk-order'],
    mutationFn: (payload) => agent2.Admin.DeleteBulkOrder(payload),
    onSuccess: (data) => data,
  });

export const useDeleteOrder = () =>
  useMutation({
    mutationKey: ['delete-bulk-order'],
    mutationFn: (id) => agent2.Admin.DeleteOrder(id),
    onSuccess: (data) => data,
  });

export const useGetOrder = (orderId = '') =>
  useQuery({
    queryKey: ['order-' + orderId],
    queryFn: () => agent2.User.GetOrder(orderId),
    refetchOnWindowFocus: false,
    select: (response) => {
      const { data } = response.data;

      return {
        data,
      };
    },
  });

export const useUpdateOrder = (orderId = '') =>
  useMutation({
    mutationKey: ['order-' + orderId],
    mutationFn: (payload) => agent2.User.UpdateOrder(orderId, payload),
    onSuccess: (data) => data,
  });

export const useGetAllOrders = (queryParams = null) =>
  useQuery({
    queryKey: ['orders' + JSON.stringify(queryParams)],
    queryFn: () => agent2.Admin.GetAllOrders(queryParams),
    refetchOnWindowFocus: false,
    select: (response) => {
      const { data, meta } = response.data;

      return {
        data,
        meta,
      };
    },
  });

/**
 *
 * Auth API Hooks
 * ===================
 */
export const useRefreshToken = () =>
  useMutation({
    mutationKey: ['refrsh-token'],
    mutationFn: () => agent2.User.RegenerateToken(),
    onSuccess: (data) => data,
  });

export const useChangePassword = () =>
  useMutation({
    mutationKey: ['change-password'],
    mutationFn: (payload) => agent2.User.ChangePassword(payload),
    onSuccess: (res) => {
      const { message } = res.data;
      toast.success(message, {
        position: 'top-center',
        duration: 1000,
      });
    },
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ msg }) =>
          setTimeout(() => {
            toast.error(msg, { position: 'bottom-center' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

export const useResetPassword = () =>
  useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (payload) => agent1.Authentication.ForgotPasswordChange(payload),
    onSuccess: (res) => {
      const { message } = res.data;
      toast.success(message, {
        position: 'top-center',
      });
    },
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }, i) =>
          setTimeout(() => {
            toast.error(message, { position: 'top-right' });
          }, 1000 + i),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

/**
 *
 * Address API Hooks
 * ===================
 */
export const useGetUserAddress = (param = '') =>
  useQuery({
    queryKey: [`address-${param}`],
    queryFn: () => agent2.User.GetAddress(),
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

/**
 *
 * User API Hooks
 * ===================
 */
export const useGetUser = (param = '') =>
  useQuery({
    queryKey: [`user-${param}`],
    queryFn: () => agent2.User.GetUser(decrypt(param)),
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });

export const useGetAllUsers = (queryParams = null) =>
  useQuery({
    queryKey: ['users' + +JSON.stringify(queryParams)],
    queryFn: () => agent2.Admin.GetAllUsers(queryParams),
    refetchOnWindowFocus: false,
    select: (response) => {
      const { data, meta } = response.data;

      return {
        data,
        meta,
      };
    },
  });

export const useUpdateProfile = (userId = '') =>
  useMutation({
    mutationKey: ['update-profile' + userId],
    mutationFn: (payload) => agent2.User.UpdateAccount(userId, payload),
    onSuccess: (data) => data.data,
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'bottom-center' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

/**
 *
 * Admin API Hooks
 * ===================
 */
export const useGetStats = () =>
  useQuery({
    queryKey: ['stats'],
    queryFn: () => agent2.Admin.GetStats(),
    refetchOnWindowFocus: false,
    select: (response) => {
      const { data, meta } = response.data;

      return {
        data,
        meta,
      };
    },
  });

export const useCreateRole = () =>
  useMutation({
    mutationKey: ['create-role'],
    mutationFn: (payload) => agent2.Admin.CreateRole(payload),
    onSuccess: (data) => data.data,
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'bottom-center' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

export const useUpdateRole = () =>
  useMutation({
    mutationKey: ['update-role'],
    mutationFn: ({ id, updates }) => agent2.Admin.UpdateRole(id, updates),
    onSuccess: (data) => data.data,
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'bottom-center' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

export const useDeleteRole = () =>
  useMutation({
    mutationKey: ['delete-role'],
    mutationFn: (roleId = '') => agent2.Admin.DeleteRole(roleId),
    onSuccess: (data) => data.data,
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'bottom-center' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

export const useGetRoles = () =>
  useQuery({
    queryKey: ['roles'],
    queryFn: () => agent2.Admin.GetRoles(),
    refetchOnWindowFocus: false,
    select: (response) => {
      const { data } = response.data;
      return data;
    },
  });

export const useGetTeams = () =>
  useQuery({
    queryKey: ['teams'],
    queryFn: () => agent2.Admin.GetTeams(),
    refetchOnWindowFocus: false,
    select: (response) => {
      const { data } = response.data;
      return data;
    },
  });

/**
 *
 * Otp API Hooks
 * ===================
 */
export const useGetOwnOtp = (uid = '') =>
  useMutation({
    mutationKey: ['otp-' + uid],
    mutationFn: (payload) => agent1.Authentication.GetOwnOtp(payload),
    onSuccess: (data) => data,
  });
