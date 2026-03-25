using UnityEngine;

public class ChangeCameraOnClick : MonoBehaviour
{
    [Tooltip("Camera to enable")]
    public Camera cameraToActivate;
    [Tooltip("Camera to disable")]
    public Camera cameraToDeactivate;

    void OnMouseDown()
    {
        if (cameraToActivate != null)
            cameraToActivate.enabled = true;
        if (cameraToDeactivate != null)
            cameraToDeactivate.enabled = false;
    }
}
