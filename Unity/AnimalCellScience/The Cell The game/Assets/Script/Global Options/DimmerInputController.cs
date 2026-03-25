using UnityEngine;

[RequireComponent(typeof(Collider2D))]
public class ClickToDim : MonoBehaviour
{
    [Tooltip("Assign your ScreenDimmer component here")]
    public ScreenDimmer screenDimmer;

    [Range(0f, 1f)]
    [Tooltip("Dim amount to send (0 = no dim, 1 = full black)")]
    public float targetAlpha = 0.5f;

    private void OnMouseDown()
    {
        if (screenDimmer != null)
            screenDimmer.SetDim(targetAlpha);
        else
            Debug.LogWarning("No ScreenDimmer assigned on " + name, this);
    }
}