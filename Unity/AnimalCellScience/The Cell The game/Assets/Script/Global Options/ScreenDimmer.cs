using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Image))]
public class ScreenDimmer : MonoBehaviour
{
    private Image _overlay;

    [Range(0f, 1f)]
    [Tooltip("0 = no dim, 1 = fully black")]
    public float dimAmount = 0.5f;

    void Awake()
    {
        _overlay = GetComponent<Image>();
        if (_overlay == null)
            Debug.LogError("ScreenDimmer requires an Image component.");
    }

    void Start()
    {
        // Initialize overlay alpha
        UpdateDim();
    }

    /// <summary>
    /// Call this to change the dim level at runtime.
    /// </summary>
    /// <param name="amount">0 = no dim, 1 = full black</param>
    public void SetDim(float amount)
    {
        dimAmount = Mathf.Clamp01(amount);
        UpdateDim();
    }

    private void UpdateDim()
    {
        Color c = _overlay.color;
        c.a = dimAmount;
        _overlay.color = c;
    }
}
