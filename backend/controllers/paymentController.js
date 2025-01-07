import { supabase } from "../config/supabase.js";

export const getAllPayments = async (req, res) => {
  try {
    const { data: payments, error: paymentError } = await supabase.from(
      "payment"
    ).select(`
        payid,
        paydate,
        pay_complete,
        pdid,
        "tenant_userID",
        property(property_id, house_owner_userID, rent)`);

    if (paymentError) throw paymentError;

    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getPaymentsByHouseOwner = async (req, res) => {
  try {
    const { house_owner_userID } = req.params;

    const { data: properties, error: propertyError } = await supabase
      .from("property")
      .select("property_id")
      .eq("house_owner_userID", house_owner_userID);

    if (propertyError) throw propertyError;

    const propertyIds = properties.map((property) => property.property_id);

    const { data: payments, error: paymentError } = await supabase
      .from("payment")
      .select(
        `
        payid,
        paydate,
        pay_complete,
        pdid,
        "tenant_userID",
        property(property_id, rent)
      `
      )
      .in("pdid", propertyIds);

    if (paymentError) throw paymentError;

    const paymentsWithRent = payments.map((payment) => ({
      id: payment.payid,
      amount: payment.property.rent,
      payment_status: payment.pay_complete ? "Complete" : "Pending",
      payment_date: payment.paydate,
    }));

    res.status(200).json({
      message: "Payments retrieved successfully",
      payments: paymentsWithRent,
    });
  } catch (error) {
    console.error("Error retrieving payments:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getPaymentsByTenant = async (req, res) => {
  try {
    const { tenant_userID } = req.params;
    console.log("tenant_userID", tenant_userID);

    const { data: payments, error: paymentError } = await supabase
      .from("payment")
      .select(
        `
        payid,
        paydate,
        pay_complete,
        pdid,
        "tenant_userID",
        property(property_id, rent)
      `
      )
      .eq("tenant_userID", tenant_userID);

    if (paymentError) throw paymentError;

    const paymentsWithRent = payments.map((payment) => ({
      id: payment.payid,
      amount: payment.property.rent,
      payment_status: payment.pay_complete ? "Complete" : "Pending",
      payment_date: payment.paydate,
    }));

    res.status(200).json({
      message: "Payments retrieved successfully",
      payments: paymentsWithRent,
    });
  } catch (error) {
    console.error("Error retrieving payments:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getPendingPaymentsByTenant = async (req, res) => {
  try {
    const { tenant_userID } = req.params;

    const { data: payments, error: paymentError } = await supabase
      .from("payment")
      .select(
        `
        payid,
        paydate,
        pay_complete,
        pdid,
        "tenant_userID",
        property(property_id, rent)
      `
      )
      .eq("tenant_userID", tenant_userID)
      .eq("pay_complete", false);

    if (paymentError) throw paymentError;

    const paymentsWithRent = payments.map((payment) => ({
      id: payment.payid,
      amount: payment.property.rent,
      payment_status: "Pending",
      payment_date: payment.paydate,
    }));

    res.status(200).json({
      message: "Pending payments retrieved successfully",
      payments: paymentsWithRent,
    });
  } catch (error) {
    console.error("Error retrieving pending payments:", error);
    res.status(400).json({ error: error.message });
  }
};

export const payPendingPaymentByTenant = async (req, res) => {
  try {
    const { tenant_userID } = req.params;
    const { paymentId } = req.body;
    console.log("tenant_userID", tenant_userID);
    console.log("paymentId", paymentId);
    // Update the payment status to true
    const { data, error } = await supabase
      .from("payment")
      .update({ pay_complete: true })
      .eq("tenant_userID", tenant_userID)
      .eq("payid", paymentId)
      .eq("pay_complete", false);

    if (error) throw error;

    res.status(200).json({
      message: "Payment status updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(400).json({ error: error.message });
  }
};
