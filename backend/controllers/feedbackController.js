import { supabase } from '../config/supabase.js';

export const addFeedback = async (req, res) => {
  const { property_id, frating, fcomments, tenant_userID } = req.body;

  console.log("Adding feedback:", req.body);

  const { data: feedback, error: feedbackError } = await supabase
    .from('feedback')
    .insert([{ property_id, frating, fcomments, tenant_userID }])
    .single();

  if (feedbackError) {
    console.error("Error adding feedback:", feedbackError);
    return res.status(400).send(feedbackError.message);
  }

  console.log("Feedback added:", feedback);

  res.send("Feedback added");
};

export const getFeedback = async (req, res) => {
  const { property_id } = req.params;

  console.log("Fetching feedback for property_id:", property_id);

  const { data: feedback, error } = await supabase
    .from('feedback')
    .select('fid, frating, fcomments, fdate, tenant_userID')
    .eq('property_id', property_id);

  if (error) {
    console.error("Error fetching feedback:", error);
    return res.status(400).send(error.message);
  }

  console.log("Feedback fetched:", feedback);

  res.send(feedback);
};
