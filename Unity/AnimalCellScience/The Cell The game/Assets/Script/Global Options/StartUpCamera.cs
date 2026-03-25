using UnityEngine;

public class StartupCamera : MonoBehaviour
{
    [Tooltip("Drag your MainCamera here")]
    public Camera initialCamera;

    void Start()
    {
        // Make sure only this camera renders at the very start:
        foreach (var cam in Camera.allCameras)
            cam.enabled = false;

        initialCamera.enabled = true;
    }
}
