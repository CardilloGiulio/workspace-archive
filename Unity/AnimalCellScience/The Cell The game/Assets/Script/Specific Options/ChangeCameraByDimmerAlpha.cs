using UnityEngine;

[RequireComponent(typeof(Collider2D))]
public class ChangeCameraByDimmer : MonoBehaviour
{
    [Header("Reference to your ScreenDimmer")]
    [Tooltip("Drag in the GameObject that has your ScreenDimmer component")]
    public ScreenDimmer screenDimmer;

    [Header("Cameras for each brightness level")]
    [Tooltip("0.85–0.99 = Black Brightness")]
    public Camera cameraBlackBrightness;
    [Tooltip("0.7 = Low Brightness")]
    public Camera cameraLowBrightness;
    [Tooltip("0.5 = High Brightness")]
    public Camera cameraHighBrightness;
    [Tooltip("0–0.2 = Full Brightness")]
    public Camera cameraFullBrightness;

    private void OnMouseDown()
    {
        if (screenDimmer == null)
        {
            Debug.LogWarning("ChangeCameraByDimmer: no ScreenDimmer reference set!", this);
            return;
        }

        float dim = screenDimmer.dimAmount;
        DisableAll();

        if (dim >= 0.85f && dim <= 0.99f)
        {
            cameraBlackBrightness.enabled = true;
        }
        else if (Mathf.Approximately(dim, 0.7f))
        {
            cameraLowBrightness.enabled = true;
        }
        else if (Mathf.Approximately(dim, 0.5f))
        {
            cameraHighBrightness.enabled = true;
        }
        else if (dim <= 0.2f)
        {
            cameraFullBrightness.enabled = true;
        }
        else
        {
            Debug.LogWarning($"ChangeCameraByDimmer: dimAmount {dim:F2} did not match any brightness range.", this);
        }
    }

    private void DisableAll()
    {
        cameraBlackBrightness.enabled = false;
        cameraLowBrightness.enabled = false;
        cameraHighBrightness.enabled = false;
        cameraFullBrightness.enabled = false;
    }
}
